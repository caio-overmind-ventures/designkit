import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { getDesignMeta } from "@/lib/design-meta";

export const dynamic = "force-dynamic";

const STYLEGUIDES_DIR = join(process.cwd(), "styleguides");

export async function GET() {
  if (!existsSync(STYLEGUIDES_DIR)) return NextResponse.json({});

  const entries = await readdir(STYLEGUIDES_DIR, { withFileTypes: true });
  const metas: Record<string, any> = {};

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    const meta = await getDesignMeta(entry.name);
    if (meta) metas[entry.name] = meta;
  }

  return NextResponse.json(metas);
}
