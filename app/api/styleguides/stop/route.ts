import { NextRequest, NextResponse } from "next/server";
import { stopStyleguide } from "@/lib/process-manager";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { domain } = await req.json();
  if (!domain) {
    return NextResponse.json({ ok: false, error: "domain required" }, { status: 400 });
  }

  const result = await stopStyleguide(domain);
  return NextResponse.json(result);
}
