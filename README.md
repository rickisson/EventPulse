# EventPulse

A real-time event monitoring dashboard built with React, Vite, and Tailwind CSS v4.

---

## Running the app

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Approach

### Stack
- **React 19** — UI and state
- **Vite 8** — dev server and bundler
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/postcss`
- **Google Fonts** — Syne (headings) + Space Mono (data/labels)

### Architecture

```
src/
├── data/events.js          # Mock event data (replace with real API)
├── hooks/useEvents.js      # All data logic: fetch, filter, sort, selection
├── components/
│   ├── FilterBar.jsx       # Search input + type/sort dropdowns
│   ├── EventList.jsx       # Scrollable list of EventCards
│   ├── EventCard.jsx       # Single event row with type badge + confidence
│   ├── EventDetail.jsx     # Full detail panel for selected event
│   └── StatusBadge.jsx     # Coloured type label (ALERT / MOVEMENT / SIGNAL)
└── App.jsx                 # Layout shell + mobile view switching
```

### Layout
Two-panel desktop layout (sidebar + detail). On mobile, only one panel is visible at a time — selecting an event navigates to the detail view, and a back button returns to the list.

### Theming
Design tokens are defined as CSS custom properties in `src/index.css` and exposed to Tailwind via `@theme inline`. Swapping the `:root` values is enough to re-theme the entire app.

```css
:root {
  --bg:          #0a0a0a;
  --fg:          #e8e8e0;
  --accent:      #00ff88;
  --border:      #1e1e1e;
  --muted:       #555;
  --card-hover:  #111;
  --card-active: #0f1a13;
}
```

### Connecting real data
Replace the `useEffect` in `src/hooks/useEvents.js`. Each event must match this shape:
