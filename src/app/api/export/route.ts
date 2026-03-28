import { NextResponse } from "next/server";

import { getExportPayload } from "@/lib/logging";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") === "csv" ? "csv" : "json";
  const payload = await getExportPayload(format);

  return new NextResponse(payload.body, {
    headers: {
      "Content-Type": payload.contentType,
      "Content-Disposition": `attachment; filename="${payload.filename}"`,
    },
  });
}
