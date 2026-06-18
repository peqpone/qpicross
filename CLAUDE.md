# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # dev server with hot-reload
npm run build        # type-check + production build
npm run test:unit    # run all unit tests once (Vitest)
npm run lint         # ESLint with auto-fix
```

Run a single test file:
```sh
npx vitest run src/stores/__tests__/game.spec.ts
```

## Architecture

**qpicross** is a single-page Picross (nonogram) game built with Vue 3 + Vite. There is a single route (`/`) rendering `HomeView`.

### Game state — `src/stores/game.ts`

All game logic lives in a single Pinia store. Key concepts:

- **`resultBoard`** — the solution grid (author-drawn or randomly generated). Each cell is `0 | 1`.
- **`gameBoard`** — the player's in-progress grid. Each cell is `0 | 1 | undefined`, where `undefined` means the player has marked the cell as empty (rendered as an ✕).
- **`drawMode`** — when `true` the active tool fills cells (`0↔1`); when `false` it marks empties (`undefined↔0`).
- **`columnHelper` / `rowHelper`** — computed clue arrays derived from `resultBoard` (consecutive run-lengths per row/column).
- When a row or column is fully solved, `fillRowWithCrosses` / `fillColumnWithCrosses` auto-fills the remaining `0` cells with `undefined` as a convenience.
- `isGameStarted` gates which board the store and components operate on: `false` = editing `resultBoard`, `true` = playing on `gameBoard`.

### Component layout (`src/views/HomeView.vue`)

```
HomeView
├── TheLogo
├── TheColumnHelper   (clue numbers above columns)
├── TheRowHelper      (clue numbers left of rows)
├── TheBoard          (grid of SquareBlock)
│   └── SquareBlock   (single cell; handles click + drag via @vueuse/core)
├── TheModeSwitch     (draw vs. erase toggle)
├── TheWin            (win overlay)
└── TheControls       (sliders for squareSize/level/boardSize; play/stop/random buttons)
```

### Styling

Vuetify 3 is the component library (`src/plugins/vuetify.ts`). Component-scoped styles use **Less**. The `@` alias resolves to `src/`.

### Tests

Tests live in `src/stores/__tests__/`. The store is tested directly using `@pinia/testing` (`createTestingPinia({ stubActions: false })`); a minimal `shallowMount` is used only to trigger `onBeforeMount`. Components have no tests.