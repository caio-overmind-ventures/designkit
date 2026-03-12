import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ port: string; path: string[] }> }
) {
  const { port, path } = await params;
  const portNum = parseInt(port, 10);
  if (isNaN(portNum) || portNum < 3200 || portNum > 3300) {
    return NextResponse.json({ error: "Invalid port" }, { status: 400 });
  }

  const pathStr = path.join("/");
  const url = `http://127.0.0.1:${portNum}/${pathStr}${request.nextUrl.search}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": request.headers.get("accept") || "*/*",
        "Accept-Encoding": request.headers.get("accept-encoding") || "",
      },
    });

    const contentType = res.headers.get("content-type") || "text/html";
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Styleguide not responding" },
      { status: 502 }
    );
  }
}
