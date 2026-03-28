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
  recommendationMessages: Record<ConditionId, string>;
};

export const TASKS_PER_SESSION = 3;

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
    assistantMessage: (task) => task.recommendationMessages.A,
  },
  B: {
    id: "B",
    label: "Professional / Formal tone",
    cue: "tone",
    assistantName: "ChatX",
    assistantMessage: (task) => task.recommendationMessages.B,
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
    recommendationMessages: {
      A: "Hey! I'd go with Option A here. The lighter build and longer battery life make it a better campus pick.",
      B: "Recommendation: Option A is the preferred selection due to its stronger battery performance and portability for daily campus use.",
    },
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
    recommendationMessages: {
      A: "I'd choose Option B for this one. It takes a bit longer, but it feels much safer for reaching the exam on time.",
      B: "Recommendation: Option B is the preferred selection because it provides a more reliable arrival window for the exam.",
    },
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
    recommendationMessages: {
      A: "I'd stick with Option A here. It looks easier for the whole team to pick up and start using quickly.",
      B: "Recommendation: Option A is the preferred selection because it better supports quick onboarding and straightforward collaboration.",
    },
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
  {
    id: "study-app",
    title: "Study App Recommendation",
    prompt:
      "A student wants a study app for revision, flashcards, and distraction-free practice.",
    recommendedOption: "A",
    recommendationReason:
      "It supports focused revision and is easier to use during short study sessions.",
    recommendationMessages: {
      A: "I'd go with Option A. It seems much better for focused revision without extra distractions.",
      B: "Recommendation: Option A is the preferred selection because it offers a cleaner environment for revision and flashcard practice.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "FLASHCARD SUPPORT",
          "OFFLINE ACCESS",
          "MINIMAL DISTRACTIONS",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "SOCIAL FEATURES",
          "FREQUENT NOTIFICATIONS",
          "BUSIER INTERFACE",
        ],
      },
    ],
  },
  {
    id: "budget-phone",
    title: "Budget Phone Recommendation",
    prompt:
      "A student needs a budget phone for calls, maps, messaging, and long battery life.",
    recommendedOption: "A",
    recommendationReason:
      "It focuses on battery life and everyday reliability at the lower price point.",
    recommendationMessages: {
      A: "I'd pick Option A here. It feels like the smarter everyday phone for a student budget.",
      B: "Recommendation: Option A is the preferred selection due to its stronger battery value and lower overall cost.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "LOWER PRICE",
          "STRONG BATTERY LIFE",
          "RELIABLE DAILY USE",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "HIGHER PRICE",
          "BETTER GAMING POWER",
          "SHORTER BATTERY LIFE",
        ],
      },
    ],
  },
  {
    id: "meeting-time",
    title: "Meeting Time Recommendation",
    prompt:
      "A student team wants a weekly meeting time that most members can attend consistently.",
    recommendedOption: "B",
    recommendationReason:
      "It gives the team a more reliable attendance window each week.",
    recommendationMessages: {
      A: "I'd go with Option B. The later slot looks like the one the full team can actually keep showing up for.",
      B: "Recommendation: Option B is the preferred selection because it supports more consistent team attendance.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "EARLIER TIME SLOT",
          "ONE MEMBER OFTEN ABSENT",
          "LESS CONSISTENT ATTENDANCE",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "SLIGHTLY LATER SLOT",
          "ALL MEMBERS USUALLY FREE",
          "MORE CONSISTENT ATTENDANCE",
        ],
      },
    ],
  },
  {
    id: "cloud-storage",
    title: "Cloud Storage Recommendation",
    prompt:
      "A student group needs shared storage for documents and presentations at low cost.",
    recommendedOption: "A",
    recommendationReason:
      "It meets the group needs without paying for unnecessary extra features.",
    recommendationMessages: {
      A: "Option A looks better to me. It covers what the group needs without paying extra for features they probably won't use.",
      B: "Recommendation: Option A is the preferred selection because it satisfies the storage requirement at the lower cost.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "LOWER MONTHLY COST",
          "SHARED FOLDER ACCESS",
          "ENOUGH STORAGE SPACE",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "HIGHER MONTHLY COST",
          "ENTERPRISE FEATURES",
          "MORE STORAGE THAN NEEDED",
        ],
      },
    ],
  },
  {
    id: "library-spot",
    title: "Library Study Spot Recommendation",
    prompt:
      "A student wants a library study spot with low noise and reliable charging access.",
    recommendedOption: "A",
    recommendationReason:
      "It gives the student a quieter place with fewer interruptions for long study sessions.",
    recommendationMessages: {
      A: "I'd go with Option A here. The quieter space and nearby charging sound much better for a long study session.",
      B: "Recommendation: Option A is the preferred selection because it provides a quieter environment with better charging access.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "QUIET ZONE",
          "CHARGING PORTS NEARBY",
          "FEWER DISTRACTIONS",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "OPEN SEATING AREA",
          "LIMITED CHARGING ACCESS",
          "MORE CONVERSATION NEARBY",
        ],
      },
    ],
  },
  {
    id: "online-course",
    title: "Online Course Recommendation",
    prompt:
      "A beginner wants an online course that teaches web development in a practical way.",
    recommendedOption: "A",
    recommendationReason:
      "It offers the clearer learning path for someone starting from the basics.",
    recommendationMessages: {
      A: "I'd choose Option A. It feels like the easier course to follow if someone is just getting started.",
      B: "Recommendation: Option A is the preferred selection because it presents a clearer beginner path with practical exercises.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "BEGINNER-FRIENDLY LESSONS",
          "HANDS-ON PROJECTS",
          "CLEAR PROGRESSION",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "ADVANCED LECTURES",
          "FEWER EXERCISES",
          "ASSUMES PRIOR EXPERIENCE",
        ],
      },
    ],
  },
  {
    id: "intern-candidate",
    title: "Intern Candidate Recommendation",
    prompt:
      "A student team needs an intern who can quickly help with testing and documentation.",
    recommendedOption: "A",
    recommendationReason:
      "It better matches the immediate need for communication and practical support work.",
    recommendationMessages: {
      A: "I'd go with Option A for this role. It seems like the safer choice for someone who can help the team right away.",
      B: "Recommendation: Option A is the preferred selection because it aligns more closely with the team's immediate documentation and testing needs.",
    },
    options: [
      {
        id: "A",
        title: "Option A",
        details: [
          "STRONG COMMUNICATION",
          "DOCUMENTATION EXPERIENCE",
          "READY TO START QUICKLY",
        ],
      },
      {
        id: "B",
        title: "Option B",
        details: [
          "STRONG THEORY KNOWLEDGE",
          "LIMITED TEAM EXPERIENCE",
          "NO DOCUMENTATION WORK",
        ],
      },
    ],
  },
];

const TASKS_BY_ID = new Map(TASKS.map((task) => [task.id, task]));

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

function shuffleTasks(tasks: TaskDefinition[]) {
  const shuffled = [...tasks];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function getTasksByIds(taskIds: string[]) {
  return taskIds
    .map((taskId) => TASKS_BY_ID.get(taskId))
    .filter((task): task is TaskDefinition => Boolean(task));
}

export function pickSessionTaskIds(previousTaskIds: string[] = []) {
  const availableTasks = TASKS.filter((task) => !previousTaskIds.includes(task.id));
  const sourceTasks =
    availableTasks.length >= TASKS_PER_SESSION ? availableTasks : TASKS;

  return shuffleTasks(sourceTasks)
    .slice(0, TASKS_PER_SESSION)
    .map((task) => task.id);
}
