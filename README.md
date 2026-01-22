# Radiology Patient Manager

Pink-themed FHIR R4 patient directory built with React + TypeScript + Vite. Includes search, pagination, detail view, and branded chrome (sidebar, header, footer).

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Run dev server (Vite)
   ```bash
   npm run dev
   ```
   Open the printed localhost URL (defaults to http://localhost:5173).

## Scripts
- `npm run dev`    – start dev server
- `npm run build`  – production build
- `npm run preview`– preview the production build

## Requirements
- Node.js 18+
- npm

## Features
- **FHIR live data**: Reads Patient resources from the public HAPI FHIR R4 server.
- **Search + pagination**: Client-side filter on name/id/gender; fixed 10 per page with first/prev/next/last controls and adjustable fetch size (10/20/30/50/100).
- **Detail view**: Demographics and addresses with routing via React Router v6.
- **Chrome**: Sticky top bar (greeting + search), left sidebar (logo → home, refresh button, about popup), footer with links and “Hire Me” CTA that shows a thank-you overlay.
- **Theme**: Pink primary (#DA418A), dark text, light-gray background.

## Project Structure
- `src/services/` – FHIR API calls (axios)
- `src/types/`    – Typed FHIR Patient/Bundle interfaces
- `src/components/` – `PatientList`, `PatientDetail`, layout pieces
- `src/App.tsx`   – Layout shell and routes
- `src/main.tsx`  – App bootstrap with Router



## More Details
See [APPROACH.md](./APPROACH.md) for architectural decisions, tradeoffs, and interview talking points.
