# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Just Park** is a React + TypeScript + Vite web application for finding real-time on-street parking availability in Melbourne, Australia. It renders 800+ parking bay sensors on an interactive Leaflet/OpenStreetMap map, sourcing data from Melbourne City Council's OpenData API cached locally in `public/db.json`.

## Commands

This project uses **pnpm** as the package manager.

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (http://localhost:5173)
pnpm run build        # tsc -b && vite build (type-check then bundle)
pnpm run lint         # ESLint (flat config, targets *.ts and *.tsx)
pnpm run preview      # Serve the production build locally
```

There is no test runner installed. The `src/__tests__/` directory exists with `.gitkeep` placeholders only.

To refresh the parking dataset from the Melbourne OpenData API:
```bash
node scripts/fetchParkingData.mjs   # Requires an API token — see script for details
```

## Architecture

### Data Flow

1. `public/db.json` — static snapshot of parking bay sensor data (fetched offline via script)
2. `useParkingData` hook (`src/hooks/`) — loads and parses `db.json`, returns typed `ParkingSpot[]`
3. `ParkingMap` component filters the spots by `showAvailableOnly` flag and renders Leaflet markers
4. `LocationSearchBar` calls the Nominatim OSM API (debounced, geofenced to Melbourne CBD) and passes a `searchLocation` coordinate up to `MapScreen`, which pans the map

### Key Types (`src/types/`)

```typescript
ParkingSpot { id, status, lat, lng, zone, lastUpdated }
// status: "Unoccupied" = available (green marker); anything else = occupied (red marker)
```

### Component / Page Structure

- **`App.tsx`** — React Router root; wraps all routes in `MainLayout`
- **`MainLayout`** — shared `Header` + page content + `Footer`
- **`pages/map/MapScreen.tsx`** — sole page; owns top-level state (`selectedSpot`, `showAvailableOnly`, `searchLocation`) and composes `LocationSearchBar`, `ParkingMap`, and `ParkingDetailsDrawer`
- **`components/map/`** — `ParkingMap` (Leaflet integration), `ParkingDetailsDrawer` (MUI Drawer)
- **`components/forms/`** — `LocationSearchBar` (MUI Autocomplete + Nominatim)
- **`components/home/`** — `HeroSection` (landing banner with search overlay)
- **`components/navigation/`** — `Header`, `Footer`

### Styling

- **MUI v7** (`@mui/material`) with Emotion as CSS-in-JS engine
- Custom theme defined in `src/styles/theme.ts` — consult it before adding new colors or spacing values
- Component-local styles are colocated in a `style.ts` (or `styles.ts`) file beside the component and exported as plain objects used via MUI's `sx` prop
- No Tailwind, no CSS Modules, no global CSS beyond `src/index.css` (minimal reset)

## Path Alias

`@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`). Always use `@/` imports rather than deep relative paths.

## TypeScript

Strict mode is on. `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` are enforced at build time. The `pnpm run build` command will fail on type errors.

## External APIs

| Service | URL | Auth |
|---------|-----|------|
| Melbourne OpenData (parking sensors) | `https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/on-street-parking-bay-sensors` | API token (script only) |
| Nominatim OSM (geocoding) | `https://nominatim.openstreetmap.org/search` | None |

The app itself only reads from `public/db.json` at runtime — it does not call the Melbourne API directly.

## Conventions

- **File naming**: Components are PascalCase (`ParkingMap.tsx`); hooks, utils, and services are camelCase (`useParkingData.ts`, `parkingUtils.ts`)
- **Style files**: Name `style.ts` (singular) for new components — the codebase has minor inconsistency (`style.ts` vs `styles.ts`); prefer singular going forward
- **No external state management**: State is managed with React hooks and prop-drilling; `src/context/` exists as a placeholder for future Context usage
- **HTTP client**: The app uses the native `fetch` API for both `db.json` and Nominatim calls; `axios` is installed but unused
