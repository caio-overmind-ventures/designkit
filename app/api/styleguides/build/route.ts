import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import { join } from "path";
import { existsSync, mkdirSync, symlinkSync, unlinkSync, readFileSync, writeFileSync } from "fs";

export const dynamic = "force-dynamic";

const STYLEGUIDES_DIR = join(process.cwd(), "styleguides");
const STATIC_DIR = join(process.cwd(), "static");

export async function POST(req: NextRequest) {
  const { domain } = await req.json();
  if (!domain) {
    return NextResponse.json({ ok: false, error: "domain required" }, { status: 400 });
  }

  const projectDir = join(STYLEGUIDES_DIR, domain);
  if (!existsSync(projectDir)) {
    return NextResponse.json({ ok: false, error: "styleguide not found" }, { status: 404 });
  }

  try {
    // Update next.config for static export with basePath
    const configPath = join(projectDir, "next.config.ts");
    const configContent = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/s/${domain}",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
`;
    writeFileSync(configPath, configContent);

    // Build
    execSync("npx next build", {
      cwd: projectDir,
      stdio: "pipe",
      timeout: 120000,
      env: { ...process.env, NODE_ENV: "production" },
    });

    // Create symlink in static dir
    if (!existsSync(STATIC_DIR)) {
      mkdirSync(STATIC_DIR, { recursive: true });
    }

    const symlinkPath = join(STATIC_DIR, domain);
    if (existsSync(symlinkPath)) {
      unlinkSync(symlinkPath);
    }
    symlinkSync(join(projectDir, "out"), symlinkPath);

    // Fix permissions for nginx
    execSync(`chmod -R o+rX "${join(projectDir, "out")}"`, { stdio: "pipe" });

    return NextResponse.json({ ok: true, url: `/s/${domain}/styleguide` });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "Build failed" },
      { status: 500 }
    );
  }
}
