# HumanAI Trust Attribution Prototype

Minimal screening-test prototype for the HumanAI GSoC project:
`Humanlike AI Systems and Trust Attribution`.

This prototype implements a browser-based decision experiment where users review AI recommendations, choose whether to follow or override them, and generate structured behavioral logs for later analysis.

## What This Prototype Covers

- `2 conditions (A/B)` differing in `1 cue`
- cue used in this prototype: `tone`
- same assistant identity across conditions: `ChatX`
- one session keeps the same tone across all tasks
- new sessions alternate conditions to make both variants easy to demonstrate
- structured logging to `JSON` and `CSV`
- exportable sample data included in the repository

## Condition Logic

This prototype uses an `A/B` design with one manipulated cue: `tone`.

- `Condition A`: friendly / conversational recommendation wording
- `Condition B`: professional / formal recommendation wording

The assistant identity, recommendation target, and task structure stay controlled. Only the recommendation wording changes by condition.

Example idea:

- Friendly: `Hey! I'd go with Option A here...`
- Professional: `Recommendation: Option A is the preferred selection...`

Within a single session:

- the participant receives one fixed condition
- the same tone remains active across all tasks in that session

Across new sessions:

- the prototype alternates between `A` and `B`

## Experiment Flow

1. Participant opens the landing page.
2. Clicking `Start Experiment` begins a session.
3. The system assigns:
   - a `participant_id`
   - a `session_id`
   - one tone condition
   - a set of `3` tasks from the task pool
4. For each task, the participant:
   - reviews the task
   - compares `Option A` and `Option B`
   - reads the AI recommendation
   - selects an option
   - clicks `Next Task`
5. After the final task, the participant sees a completion page.

## Logging Implementation

The app records one structured log entry per task interaction through:

- [`src/app/api/log/route.ts`](D:/humanai/humanai-trust-prototype/src/app/api/log/route.ts)
- [`src/lib/logging.ts`](D:/humanai/humanai-trust-prototype/src/lib/logging.ts)

Each log entry includes:

- `participant_id`
- `session_id`
- `task_id`
- `condition`
- `cue_type`
- `ai_recommendation`
- `user_choice`
- `decision`
- `did_user_follow_ai`
- `timestamp`
- `latency_ms`

Required screening fields are included:

- `participant_id`
- `condition`
- `decision`
- `timestamp`
- `latency_ms`

## Sample Output Files

Sample outputs are included here:

- [`data/experiment-logs.json`](D:/humanai/humanai-trust-prototype/data/experiment-logs.json)
- [`data/experiment-logs.csv`](D:/humanai/humanai-trust-prototype/data/experiment-logs.csv)

## Local Run Instructions

From the project root:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open:

```text
http://localhost:3000
```

For a production-style run:

```powershell
npm.cmd run build
npm.cmd start
```

## Exporting Data

The prototype supports direct data export through:

- `GET /api/export?format=json`
- `GET /api/export?format=csv`

Implementation:

- [`src/app/api/export/route.ts`](D:/humanai/humanai-trust-prototype/src/app/api/export/route.ts)

## Project Structure

- [`src/app/page.tsx`](D:/humanai/humanai-trust-prototype/src/app/page.tsx): landing page
- [`src/app/experiment/page.tsx`](D:/humanai/humanai-trust-prototype/src/app/experiment/page.tsx): experiment page shell
- [`src/app/complete/page.tsx`](D:/humanai/humanai-trust-prototype/src/app/complete/page.tsx): completion page
- [`src/components/experiment-runner.tsx`](D:/humanai/humanai-trust-prototype/src/components/experiment-runner.tsx): session flow and task interaction logic
- [`src/lib/experiment.ts`](D:/humanai/humanai-trust-prototype/src/lib/experiment.ts): conditions, task pool, and recommendation copy
- [`src/lib/logging.ts`](D:/humanai/humanai-trust-prototype/src/lib/logging.ts): file-based logging and export helpers

## Notes

- This is a screening-test prototype, not the full research platform.
- The current implementation uses a larger task bank while keeping each session to `3` tasks.
- The design intentionally keeps one cue fixed per session to preserve experimental consistency.
