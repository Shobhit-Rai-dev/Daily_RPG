# Daily RPG (Life RPG)

A gamified daily-quest tracker: complete real-life quests to earn XP, gold,
and stat gains, level up, and spend gold in the shop. Originally a
frontend-only prototype backed by localStorage; now backed by a real
Express + MongoDB API.

```
life-rpg/
  frontend/    React + Vite app          -> see frontend/README (below) / this file
  backend/     Express + MongoDB API     -> see backend/README.md
```

## Running it locally

You need two terminals — one for each half.

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env    # edit MONGODB_URI / JWT_SECRET as needed
npm run dev              # http://localhost:5000
```

**2. Frontend**

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

`vite.config.js` already proxies `/api` requests to `http://localhost:5000`,
so as long as the backend is running on port 5000 the frontend needs no
extra configuration. Open `http://localhost:5173`, register a new hero, and
you're in — every action now persists to MongoDB instead of the browser's
localStorage.

## What changed from the original prototype

- `frontend/src/services/api.js` no longer has a localStorage
  mock/fallback database. It only talks to the backend now, and a failed
  request throws a real error (shown as a toast) instead of silently
  faking success.
- `RPGContext`'s `setFixedGender` / `setActiveJob` used to apply changes
  locally even if the save failed (a leftover from the mock-fallback
  days). They now surface the real error instead, since the server is the
  single source of truth.
- The Login page's "any email/password works" demo note and pre-filled
  credentials are gone — you need a real registered account now.
- Everything else in the frontend — components, styling, game feel — is
  unchanged.

See `backend/README.md` for the full API reference and setup details.
