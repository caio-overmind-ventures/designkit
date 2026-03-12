import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, access } from "fs/promises";
import { join } from "path";
import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain");
  if (!domain || domain.includes("/") || domain.includes("..")) {
    return NextResponse.json({ ok: false, error: "Invalid domain" }, { status: 400 });
  }

  const portableDir = join(process.cwd(), "portable", domain);

  try {
    await access(portableDir);
  } catch {
    return NextResponse.json(
      { ok: false, error: "No portable package found. Extract the design system first." },
      { status: 404 }
    );
  }

  const archiveName = `${domain}-tokens`;
  const tarPath = `/tmp/${archiveName}.tar.gz`;

  if (existsSync(tarPath)) unlinkSync(tarPath);

  try {
    execSync(
      `tar -czf "${tarPath}" -C "${join(process.cwd(), "portable")}" "${domain}"`,
      { stdio: "pipe" }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to create archive" }, { status: 500 });
  }

  const tarBuffer = await readFile(tarPath);

  try { unlinkSync(tarPath); } catch {}

  return new NextResponse(tarBuffer, {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="${archiveName}.tar.gz"`,
      "Content-Length": String(tarBuffer.length),
    },
  });
}
