import { NextResponse } from "next/server";
import { listStyleguides } from "@/lib/process-manager";

export const dynamic = "force-dynamic";

export async function GET() {
  const styleguides = await listStyleguides();
  return NextResponse.json({ styleguides });
}
