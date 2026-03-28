"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, startTransition } from "react";

import {
  getCondition,
  getRecommendedMessage,
  TASKS,
  type ConditionId,
  type TaskDefinition,
} from "@/lib/experiment";

type SessionState = {
  participantId: string;
  sessionId: string;
  condition: ConditionId;
};

const SESSION_STORAGE_KEY = "humanai-trust-session";
const LAST_CONDITION_STORAGE_KEY = "humanai-last-condition";
const PILL_CLASS =
  "inline-flex rounded-[16px] border border-white/12 bg-black/58 px-4 py-2 text-stone-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl";
const PANEL_CLASS =
  "rounded-[22px] border border-white/12 bg-black/62 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl";
const DETAIL_CARD_CLASS =
  "w-full rounded-[18px] border border-white/12 bg-black/62 text-left text-stone-50 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl transition";
const TASK_TEXT_CLASS = "text-[17px] font-semibold leading-8 text-stone-100";
const DETAIL_TEXT_CLASS = "space-y-1 text-[13px] uppercase leading-5 text-stone-200";
const RECOMMENDATION_TEXT_CLASS = "mt-2.5 text-[14px] leading-7 text-stone-100";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function getNextAlternatingCondition(): ConditionId {
  const lastCondition = window.localStorage.getItem(LAST_CONDITION_STORAGE_KEY);
  const nextCondition: ConditionId = lastCondition === "A" ? "B" : "A";

  window.localStorage.setItem(LAST_CONDITION_STORAGE_KEY, nextCondition);

  return nextCondition;
}

function buildSession(conditionOverride?: ConditionId | null): SessionState {
  return {
    participantId: createId("P"),
    sessionId: createId("S"),
    condition: conditionOverride ?? getNextAlternatingCondition(),
  };
}

function getConditionOverride(raw: string | null): ConditionId | null {
  if (raw === "A" || raw === "B") {
    return raw;
  }

  return null;
}

function getStoredSession() {
  const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as SessionState;

    if (
      typeof parsed.participantId === "string" &&
      typeof parsed.sessionId === "string" &&
      (parsed.condition === "A" || parsed.condition === "B")
    ) {
      return parsed;
    }
  } catch {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  return null;
}

function saveSession(session: SessionState) {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function resolveSession(conditionOverride: ConditionId | null) {
  const existing = getStoredSession();

  if (existing && !conditionOverride) {
    return existing;
  }

  if (conditionOverride) {
    window.localStorage.setItem(LAST_CONDITION_STORAGE_KEY, conditionOverride);
    return buildSession(conditionOverride);
  }

  return buildSession();
}

function TaskCard({
  task,
  taskNumber,
}: {
  task: TaskDefinition;
  taskNumber: number;
}) {
  return (
    <div className={`${PANEL_CLASS} p-5 text-stone-50`}>
      <div className="space-y-2">
        <p className={TASK_TEXT_CLASS}>
          Task {taskNumber} -- {task.prompt}
        </p>
      </div>
    </div>
  );
}

function OptionsPanel({
  task,
  selectedChoice,
  onSelect,
  disabled,
}: {
  task: TaskDefinition;
  selectedChoice: "A" | "B" | null;
  onSelect: (choice: "A" | "B") => void;
  disabled: boolean;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {task.options.map((option) => (
        <div
          key={option.id}
          className={`flex w-full flex-col space-y-3 ${
            option.id === "A" ? "items-start" : "items-end"
          }`}
        >
          <div className="w-full max-w-[16.5rem] space-y-2.5">
            <div className={PILL_CLASS}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-200">
                {option.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelect(option.id)}
              disabled={disabled}
              className={`${DETAIL_CARD_CLASS} min-h-[9.5rem] px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60 ${
                selectedChoice === option.id
                  ? "border-amber-200/70 ring-1 ring-amber-200/60"
                  : "hover:border-amber-200/60"
              }`}
            >
              <ul className={DETAIL_TEXT_CLASS}>
                {option.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecommendationPanel({
  assistantName,
  message,
}: {
  assistantName: string;
  message: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className={PILL_CLASS}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-200">
          Recommendation
        </p>
      </div>

      <div className={`${PANEL_CLASS} px-4 py-3 text-stone-50`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300">
          {assistantName}
        </p>
        <p className={RECOMMENDATION_TEXT_CLASS}>{message}</p>
      </div>
    </div>
  );
}

function ProgressPill({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className={`self-start ${PILL_CLASS}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-200">
        Task {current} of {total}
      </p>
    </div>
  );
}

function ExperimentGuide({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="rounded-[20px] border border-amber-200/20 bg-black/50 p-4 text-stone-50 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100">
            Guidance
          </p>
          <p className="text-sm leading-7 text-stone-100">
            Read the task, review both options, and compare them with the
            assistant&apos;s recommendation below. You may follow the
            recommendation or override it, then click{" "}
            <span className="font-semibold text-amber-100">Next Task</span> to
            continue.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-200 transition hover:border-white/30 hover:bg-white/8"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function ExperimentRunner() {
  const router = useRouter();
  const [session, setSession] = useState<SessionState | null>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responsesRecorded, setResponsesRecorded] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const taskStartRef = useRef<number>(0);

  useEffect(() => {
    router.prefetch("/complete");
  }, [router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const conditionOverride = getConditionOverride(searchParams.get("condition"));
    const nextSession = resolveSession(conditionOverride);

    saveSession(nextSession);
    setSession(nextSession);
    taskStartRef.current = performance.now();
  }, []);

  useEffect(() => {
    taskStartRef.current = performance.now();
    setSelectedChoice(null);
  }, [taskIndex]);

  const task = TASKS[taskIndex];
  const condition = session ? getCondition(session.condition) : null;
  const assistantMessage =
    session && condition ? getRecommendedMessage(task, session.condition) : "";

  async function handleNext() {
    if (!session || isSubmitting) {
      return;
    }

    if (!selectedChoice) {
      setError("Select one option before continuing.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const latencyMs = Math.max(0, Math.round(performance.now() - taskStartRef.current));
    const decision =
      selectedChoice === task.recommendedOption ? "accept" : "override";

    const payload = {
      participant_id: session.participantId,
      session_id: session.sessionId,
      task_id: task.id,
      condition: session.condition,
      cue_type: "tone",
      ai_recommendation: task.recommendedOption,
      user_choice: selectedChoice,
      decision,
      did_user_follow_ai: selectedChoice === task.recommendedOption,
      timestamp: new Date().toISOString(),
      latency_ms: latencyMs,
    };

    const isLastTask = taskIndex === TASKS.length - 1;
    const nextResponsesRecorded = responsesRecorded + 1;

    setResponsesRecorded(nextResponsesRecorded);

    if (isLastTask) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      router.push("/complete");
    } else {
      startTransition(() => {
        setTaskIndex((current) => current + 1);
      });
    }

    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to record response.");
      }
    } catch {
      setError("The task advanced, but this response may not have synced correctly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session) {
    return (
      <div className="rounded-[22px] border border-white/12 bg-white/90 p-8 text-sm text-stone-600 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        Preparing your experiment session...
      </div>
    );
  }

  if (taskIndex >= TASKS.length) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6 rounded-[22px] border border-white/12 bg-white/90 p-8 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-stone-900">Session Complete</h1>
        <p className="text-sm leading-7 text-stone-600">
          Responses saved for {responsesRecorded} tasks.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            Return Home
          </Link>
          <Link
            href="/experiment"
            className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
          >
            Start New Session
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-4">
      {showGuide ? (
        <div className="hidden xl:absolute xl:right-full xl:top-0 xl:mr-4 xl:block xl:w-52">
          <ExperimentGuide onClose={() => setShowGuide(false)} />
        </div>
      ) : null}

      <ProgressPill current={taskIndex + 1} total={TASKS.length} />

      <div className="space-y-5">
        <TaskCard task={task} taskNumber={taskIndex + 1} />
        <OptionsPanel
          task={task}
          selectedChoice={selectedChoice}
          onSelect={setSelectedChoice}
          disabled={isSubmitting}
        />
        {condition ? (
          <RecommendationPanel
            assistantName={condition.assistantName}
            message={assistantMessage}
          />
        ) : null}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedChoice || isSubmitting}
            className="rounded-full border border-amber-100/35 bg-black/44 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50 shadow-[0_18px_45px_-20px_rgba(255,232,196,0.35)] backdrop-blur-md transition hover:border-amber-50/55 hover:bg-black/56 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting
              ? "Saving..."
              : taskIndex === TASKS.length - 1
                ? "Finish Session"
                : "Next Task"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-[18px] border border-rose-200 bg-rose-50/95 px-4 py-3 text-sm text-rose-700 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.65)]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
