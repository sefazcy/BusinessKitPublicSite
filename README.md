# BusinessKit Public Site

Customer-facing public website for BusinessKit. Built with React + TypeScript + Vite.

## Requirements

- Node.js 18+
- BusinessKit backend running at `http://localhost:5299`

## Setup

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Copy environment file
cp .env.example .env

# 3. Start development server on port 5174
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

## Build

```bash
npm run build
```

Output is placed in `dist/`.

## Project structure

```
src/
├── api/               # Axios API client modules
│   ├── apiClient.ts   # Axios instance (reads VITE_API_BASE_URL)
│   ├── blogApi.ts
│   ├── contactApi.ts
│   ├── galleryApi.ts
│   ├── servicesApi.ts
│   └── settingsApi.ts
├── components/
│   └── layout/        # Header, Footer, Layout wrapper
├── pages/             # Route-level page components
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── BookingPage.tsx
│   ├── GalleryPage.tsx
│   ├── BlogPage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
├── types/             # TypeScript interfaces matching backend DTOs
├── App.tsx            # BrowserRouter + routes
├── index.css          # Global styles
└── main.tsx           # Entry point
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services list |
| `/booking` | Booking (placeholder in v4.3) |
| `/gallery` | Photo gallery |
| `/blog` | Blog post list |
| `/contact` | Contact form |

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:5299` | Backend API base URL |

## Version history

- **v4.3** — Foundation: layout, pages, API client, responsive CSS
- **v4.4** — Booking form (planned)
- **v4.5** — Payment checkout (planned)
