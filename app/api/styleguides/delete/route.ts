import { NextRequest, NextResponse } from "next/server";
import { stopStyleguide } from "@/lib/process-manager";
import { rm, access } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
  const { domain } = await req.json();
  if (!domain || typeof domain !== "string") {
    return NextResponse.json({ ok: false, error: "Missing domain" }, { status: 400 });
  }

  // Safety: prevent path traversal
  if (domain.includes("/") || domain.includes("..")) {
    return NextResponse.json({ ok: false, error: "Invalid domain" }, { status: 400 });
  }

  // Stop if running
  await stopStyleguide(domain).catch(() => {});

  const base = process.cwd();
  const dirs = [
    join(base, "styleguides", domain),
    join(base, "extractions", domain),
    join(base, "portable", domain),
  ];

  const screenshotPath = join(base, "public", "screenshots", `${domain}.jpg`);

  let deleted = [];

  for (const dir of dirs) {
    try {
      await access(dir);
      await rm(dir, { recursive: true, force: true });
      deleted.push(dir.replace(base + "/", ""));
    } catch {}
  }

  try {
    await access(screenshotPath);
    await rm(screenshotPath);
    deleted.push(`screenshots/${domain}.jpg`);
  } catch {}

  return NextResponse.json({ ok: true, deleted });
}
