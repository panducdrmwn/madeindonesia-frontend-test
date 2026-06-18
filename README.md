# MadeIndonesia Frontend Test

Minimal Next.js frontend for viewing 3D models (React Three Fiber).

## Prerequisites

- Node.js 18+ (recommended)
- npm (or use `corepack` with pnpm/yarn if preferred)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build & Start

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Useful scripts

- `npm run dev` — start dev server
- `npm run build` — create production build
- `npm start` — start production server
- `npm run lint` — run linter

## Project layout

- `app/` — Next.js app routes and pages
- `components/` — React components used by the viewer
- `lib/` — loaders and model store utilities

## Notes

- This project uses Next.js 14 and React 18. If you see dependency warnings, ensure Node.js is up to date.
- If you want me to add development notes, environment variables, or a contribution guide, tell me which details to include.
