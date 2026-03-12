import { spawn, ChildProcess } from "child_process";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import net from "net";

const STYLEGUIDES_DIR = join(process.cwd(), "styleguides");
const BASE_PORT = 3201;
const MAX_CONCURRENT = 3;
const AUTO_STOP_MS = 10 * 60 * 1000; // 10 minutes

interface RunningProcess {
  process: ChildProcess;
  port: number;
  startedAt: string;
  lastAccessed: number;
  autoStopTimer: ReturnType<typeof setTimeout>;
}

// Survive HMR in dev mode by attaching to globalThis
const globalKey = Symbol.for("design-hub-processes");
const g = globalThis as any;
if (!g[globalKey]) g[globalKey] = new Map<string, RunningProcess>();
const running: Map<string, RunningProcess> = g[globalKey];

function resetAutoStop(domain: string) {
  const proc = running.get(domain);
  if (!proc) return;
  clearTimeout(proc.autoStopTimer);
  proc.lastAccessed = Date.now();
  proc.autoStopTimer = setTimeout(() => {
    console.log(`[auto-stop] ${domain} idle for 10min, stopping`);
    stopStyleguide(domain);
  }, AUTO_STOP_MS);
}

export function getRunningCount(): number {
  return running.size;
}

export function touchStyleguide(domain: string) {
  resetAutoStop(domain);
}

function findFreePort(startPort: number): Promise<number> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
    server.on("error", () => {
      resolve(findFreePort(startPort + 1));
    });
  });
}

export async function listStyleguides() {
  if (!existsSync(STYLEGUIDES_DIR)) return [];

  const entries = await readdir(STYLEGUIDES_DIR, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

    const domain = entry.name;
    const dir = join(STYLEGUIDES_DIR, domain);
    const pkgPath = join(dir, "package.json");

    if (!existsSync(pkgPath)) continue;

    const stats = await stat(dir);
    const proc = running.get(domain);

    const outDir = join(dir, "out");
    const built = existsSync(outDir);

    results.push({
      domain,
      createdAt: stats.birthtime.toISOString(),
      status: proc ? ("running" as const) : ("stopped" as const),
      port: proc?.port || null,
      startedAt: proc?.startedAt || null,
      built,
    });
  }

  return results.sort((a, b) => a.domain.localeCompare(b.domain));
}

export async function startStyleguide(domain: string): Promise<{
  ok: boolean;
  port?: number;
  error?: string;
  runningCount?: number;
  maxConcurrent?: number;
}> {
  if (running.has(domain)) {
    const proc = running.get(domain)!;
    resetAutoStop(domain);
    return { ok: true, port: proc.port, runningCount: running.size, maxConcurrent: MAX_CONCURRENT };
  }

  if (running.size >= MAX_CONCURRENT) {
    return {
      ok: false,
      error: `Maximum ${MAX_CONCURRENT} concurrent previews reached. Stop another preview first or wait for auto-stop (10 min idle).`,
      runningCount: running.size,
      maxConcurrent: MAX_CONCURRENT,
    };
  }

  const dir = join(STYLEGUIDES_DIR, domain);
  if (!existsSync(dir)) {
    return { ok: false, error: "Styleguide not found" };
  }

  const port = await findFreePort(BASE_PORT);

  // Clean stale lock files from previous runs
  const lockFile = join(dir, ".next", "dev", "lock");
  if (existsSync(lockFile)) {
    const { unlinkSync } = await import("fs");
    try { unlinkSync(lockFile); } catch {}
  }

  const nextBin = join(dir, "node_modules", ".bin", "next");
  const child = spawn(nextBin, ["dev", "--hostname", "0.0.0.0", "--port", String(port)], {
    cwd: dir,
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
    env: { ...process.env, PORT: String(port), PATH: process.env.PATH || "" },
    shell: false,
  });

  // Log errors for debugging
  child.stderr?.on("data", (data: Buffer) => {
    console.error(`[${domain}:${port}] ${data.toString().trim()}`);
  });
  child.stdout?.on("data", (data: Buffer) => {
    console.log(`[${domain}:${port}] ${data.toString().trim()}`);
  });

  child.unref();

  child.on("error", (err) => {
    console.error(`Failed to start ${domain}:`, err);
    running.delete(domain);
  });

  child.on("exit", () => {
    running.delete(domain);
  });

  const autoStopTimer = setTimeout(() => {
    console.log(`[auto-stop] ${domain} idle for 10min, stopping`);
    stopStyleguide(domain);
  }, AUTO_STOP_MS);

  running.set(domain, {
    process: child,
    port,
    startedAt: new Date().toISOString(),
    lastAccessed: Date.now(),
    autoStopTimer,
  });

  // Wait for the server to actually start
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return { ok: true, port, runningCount: running.size, maxConcurrent: MAX_CONCURRENT };
}

export async function stopStyleguide(domain: string): Promise<{
  ok: boolean;
  error?: string;
}> {
  const proc = running.get(domain);
  if (!proc) {
    return { ok: false, error: "Not running" };
  }

  clearTimeout(proc.autoStopTimer);
  try {
    // Kill the process group (negative PID)
    process.kill(-proc.process.pid!, "SIGTERM");
  } catch {
    proc.process.kill("SIGTERM");
  }
  running.delete(domain);

  return { ok: true };
}
