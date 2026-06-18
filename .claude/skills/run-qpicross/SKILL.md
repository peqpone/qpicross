---
name: run-qpicross
description: Build, run, and drive qpicross. Use when asked to start qpicross, run its tests, build it, take a screenshot of its UI, or interact with the running app.
---

qpicross is a Vue 3 browser app (Vite dev server). Drive it via `.claude/skills/run-qpicross/driver.mjs`, which launches a headless Playwright Chromium instance against the running server.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run (agent path)

Start the dev server, then invoke the driver:

```bash
npm run dev &>/tmp/qpicross-dev.log &
echo $! > /tmp/qpicross-dev.pid
for i in $(seq 1 40); do curl -sf http://localhost:5173 >/dev/null && break; sleep 0.5; done

node .claude/skills/run-qpicross/driver.mjs smoke
```

Stop the server when done:

```bash
kill $(cat /tmp/qpicross-dev.pid)
```

Driver commands (server must already be running):

| command | what it does |
|---|---|
| `smoke [outfile]` | Full flow: load page → generate random puzzle → start game → 3 screenshots |
| `screenshot [outfile]` | Snapshot current page state |
| `generate` | Click the dice button to generate a random puzzle |
| `start` | Click play to enter game mode |
| `reset` | Click stop to return to edit mode |

Default screenshot path: `/tmp/qpicross.png`. Smoke also writes `/tmp/qpicross-initial.png` and `/tmp/qpicross-generated.png`.

## Run (human path)

```bash
npm run dev   # → http://localhost:5173. Ctrl-C to stop.
```

## Test

```bash
npm run test:unit
```

9 tests pass. A Vue warn about `onBeforeMount` appears in output — it's a test-harness artifact, not a bug.

## Gotchas

- **`chromium-cli` is not available** — the driver imports `playwright` directly. Both `npm install playwright` and `npx playwright install chromium` are required.
- **Button selectors target icon classes** (`button:has(.mdi-dice-multiple)`) because Vuetify icon-only buttons have no text. If icons change, update these selectors in `driver.mjs`.
- **`gameBoard` vs `resultBoard`** — before `start`, the board shows `resultBoard` (the solution being drawn). After `start`, it switches to `gameBoard` (the player's blank grid). The `smoke` command exercises both states.

## Troubleshooting

- **`EADDRINUSE` on port 5173**: previous dev server still running — `kill $(cat /tmp/qpicross-dev.pid)` or `pkill -f vite`.
- **`Cannot find module 'playwright'`**: run `npm install playwright` then `npx playwright install chromium`.
- **Driver hangs on `.board` selector**: dev server not ready — check `/tmp/qpicross-dev.log`.