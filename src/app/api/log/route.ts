import { NextResponse } from "next/server";

import { appendLog } from "@/lib/logging";
import type { ExperimentLogEntry } from "@/lib/experiment";

export const runtime = "nodejs";

function isValidPayload(payload: unknown): payload is ExperimentLogEntry {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const entry = payload as Record<string, unknown>;

  return (
    typeof entry.participant_id === "string" &&
    typeof entry.session_id === "string" &&
    typeof entry.task_id === "string" &&
    (entry.condition === "A" || entry.condition === "B") &&
    typeof entry.cue_type === "string" &&
    (entry.ai_recommendation === "A" || entry.ai_recommendation === "B") &&
    (entry.user_choice === "A" || entry.user_choice === "B") &&
    (entry.decision === "accept" || entry.decision === "override") &&
    typeof entry.did_user_follow_ai === "boolean" &&
    typeof entry.timestamp === "string" &&
    typeof entry.latency_ms === "number"
  );
}

export async function POST(request: Request) {
  const payload = await request.json();

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      { ok: false, error: "Invalid log payload." },
      { status: 400 },
    );
  }

  await appendLog(payload);

  return NextResponse.json({ ok: true });
}
