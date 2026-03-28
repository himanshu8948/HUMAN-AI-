export type ConditionId = "A" | "B";

export type Decision = "accept" | "override";

export type TaskOption = {
  id: "A" | "B";
  title: string;
  details: string[];
};

export type TaskDefinition = {
  id: string;
  title: string;
  prompt: string;
  options: TaskOption[];
  recommendedOption: "A" | "B";
  recommendationReason: string;
};

export type ConditionDefinition = {
  id: ConditionId;
  label: string;
  cue: "tone";
  assistantName: string;
  assistantMessage: (task: TaskDefinition) => string;
};

export type ExperimentLogEntry = {
  participant_id: string;
  session_id: string;
  task_id: string;
  condition: ConditionId;
  cue_type: string;
  ai_recommendation: "A" | "B";
  user_choice: "A" | "B";
  decision: Decision;
  did_user_follow_ai: boolean;
  timestamp: string;
  latency_ms: number;
};

export const CONDITIONS: Record<ConditionId, ConditionDefinition> = {
  A: {
    id: "A",
    label: "Friendly / Conversational tone",
    cue: "tone",
    assistantName: "ChatX",
    assistantMessage: (task) =>
      `Hey! I'd go with Option ${task.recommendedOption} here. ${task.recommendationReason}`,
  },
  B: {
    id: "B",
    label: "Professional / Formal tone",
    cue: "tone",
    assistantName: "ChatX",
    assistantMessage: (task) =>
      `Recommendation: Option ${task.recommendedOption} is the preferred selection because ${task.recommendationReason.toLowerCase()}`,
  },
};

export const TASKS: TaskDefinition[] = [
  {
    id: "student-laptop",
    title: "Laptop Recommendation",
    prompt:
      "A student needs a laptop for coding classes and long battery life on campus.",
    recommendedOption: "A",
    recommendationReason:
      "It offers the battery life and portability that match the student's daily needs best.",
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "8GB RAM",
          "14-HOUR BATTERY",
          "LIGHTWEIGHT DESIGN",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "16GB RAM",
          "6-HOUR BATTERY",
          "HEAVIER DESIGN",
        ],
      },
    ],
  },
  {
    id: "study-route",
    title: "Commute Recommendation",
    prompt:
      "A student needs the most reliable way to reach an exam center on time.",
    recommendedOption: "B",
    recommendationReason:
      "It gives a more dependable arrival even if it takes a little longer.",
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "35-MINUTE ROUTE",
          "KNOWN TRAFFIC DELAYS",
          "NO BACKUP LANE",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "42-MINUTE ROUTE",
          "DEDICATED BUS LANE",
          "MORE RELIABLE ARRIVAL",
        ],
      },
    ],
  },
  {
    id: "project-tool",
    title: "Project Tool Recommendation",
    prompt:
      "A student team needs a simple tool for planning tasks and tracking progress.",
    recommendedOption: "A",
    recommendationReason:
      "It is easier to learn and fits the team's need for simple collaboration.",
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "SIMPLE INTERFACE",
          "SHARED TASK BOARD",
          "QUICK TO LEARN",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "ADVANCED ANALYTICS",
          "STEEPER LEARNING CURVE",
          "LONGER SETUP TIME",
        ],
      },
    ],
  },
];

export function getCondition(conditionId: ConditionId) {
  return CONDITIONS[conditionId];
}

export function getRandomCondition(): ConditionId {
  return Math.random() < 0.5 ? "A" : "B";
}

export function getRecommendedMessage(task: TaskDefinition, conditionId: ConditionId) {
  const condition = getCondition(conditionId);
  return condition.assistantMessage(task);
}
