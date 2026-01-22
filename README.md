# Radiology Patient Manager

Pink-themed FHIR R4 patient directory built with React + TypeScript + Vite. Includes search, pagination, detail view, and branded chrome (sidebar, header, footer).

Demo : https://pink-dash.vercel.app/

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

## FHIR Data Source
- **API Endpoint**: `https://hapi.fhir.org/baseR4`
- **Resource Type**: Patient (FHIR R4)
- **Query**: `GET /Patient?_count={limit}` (returns a Bundle of Patient resources)

## Patient Data Structure
The app retrieves and displays Patient resources with the following fields:
```json
{
   "resourceType": "Patient",
   "id": "1373719",
   "name": [
      {
         "use": "official",
         "family": "Guerfali",
         "given": ["Maher"]
      }
   ],
   "gender": "male",
   "birthDate": "1972-10-13",
   "address": [
      {
         "use": "home",
         "line": ["123 Main St"],
         "city": "Munich",
         "state": "MU",
         "postalCode": "80995",
         "country": "Germany"
      }
   ]
}
```

## Project Structure
- `src/services/` – FHIR API calls (axios)
- `src/types/`    – Typed FHIR Patient/Bundle interfaces
- `src/components/` – `PatientList`, `PatientDetail`, layout pieces
- `src/App.tsx`   – Layout shell and routes
- `src/main.tsx`  – App bootstrap with Router


