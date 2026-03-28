import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ExperimentLogEntry } from "@/lib/experiment";

const dataDirectory = path.join(process.cwd(), "data");
const jsonLogPath = path.join(dataDirectory, "experiment-logs.json");
const csvLogPath = path.join(dataDirectory, "experiment-logs.csv");

function toCsvValue(value: string | number | boolean) {
  const raw = String(value);
  if (raw.includes(",") || raw.includes('"') || raw.includes("\n")) {
    return `"${raw.replaceAll('"', '""')}"`;
  }

  return raw;
}

function toCsv(entries: ExperimentLogEntry[]) {
  const headers: (keyof ExperimentLogEntry)[] = [
    "participant_id",
    "session_id",
    "task_id",
    "condition",
    "cue_type",
    "ai_recommendation",
    "user_choice",
    "decision",
    "did_user_follow_ai",
    "timestamp",
    "latency_ms",
  ];

  const rows = entries.map((entry) =>
    headers.map((header) => toCsvValue(entry[header])).join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

async function ensureDataDirectory() {
  await mkdir(dataDirectory, { recursive: true });
}

export async function readLogs() {
  await ensureDataDirectory();

  try {
    const raw = await readFile(jsonLogPath, "utf8");
    const parsed = JSON.parse(raw) as ExperimentLogEntry[];
    return parsed.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function appendLog(entry: ExperimentLogEntry) {
  const logs = await readLogs();
  const nextLogs = [...logs, entry].sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp),
  );

  await writeLogs(nextLogs);

  return entry;
}

export async function writeLogs(entries: ExperimentLogEntry[]) {
  await ensureDataDirectory();

  await writeFile(jsonLogPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  await writeFile(csvLogPath, `${toCsv(entries)}\n`, "utf8");
}

export async function getExportPayload(format: "json" | "csv") {
  const logs = await readLogs();

  if (format === "csv") {
    return {
      body: `${toCsv(logs)}\n`,
      contentType: "text/csv; charset=utf-8",
      filename: "experiment-logs.csv",
    };
  }

  return {
    body: `${JSON.stringify(logs, null, 2)}\n`,
    contentType: "application/json; charset=utf-8",
    filename: "experiment-logs.json",
  };
}
