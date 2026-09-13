# Daily RPG — Backend

Express + MongoDB API that replaces the frontend's old localStorage mock
database. Business logic (leveling, quest rewards, shop purchases) is ported
exactly from the frontend's previous mock so gameplay didn't change — only
where the data lives.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit .env — see below
npm run dev             # starts on http://localhost:5000 (nodemon)
# or: npm start
```

### `.env` values

| Variable | Notes |
|---|---|
| `PORT` | Keep at `5000` for local dev — the frontend's `vite.config.js` already proxies `/api` there. |
| `MONGODB_URI` | Local: `mongodb://127.0.0.1:27017/life-rpg`. Or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster string. |
| `JWT_SECRET` | Any long random string. |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `30d`. |
| `CORS_ORIGIN` | Comma-separated allowed origins. Default `http://localhost:5173` matches Vite's dev server. |

You need a running MongoDB instance — either install it locally or use a free
Atlas cluster. Nothing else to seed; each new registered user gets a starter
quest log automatically.

## Project layout

```
backend/
  server.js                 entrypoint — connects to Mongo, starts Express
  src/
    app.js                  Express app + route mounting
    config/db.js            Mongoose connection
    models/                 User (with embedded character sheet), Quest, InventoryItem
    middleware/auth.js      JWT verification (protect)
    middleware/errorHandler.js
    controllers/            one file per resource
    routes/                 one file per resource
    utils/
      gameData.js           tiers, shop catalog, starter quests, achievement defs
      gameLogic.js          quest-completion math, leveling, streak, achievements
      generateToken.js
```

## API reference

All routes are prefixed with `/api`. Every route except `/auth/register` and
`/auth/login` requires `Authorization: Bearer <token>`.

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/auth/register` | `{ username, email, password }` | `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | `{ token, user }` |
| GET | `/auth/me` | — | `{ user }` |
| GET | `/quests` | — | `Quest[]` |
| POST | `/quests` | `{ title, description, category, tier, targetStat }` | created `Quest` |
| PUT | `/quests/:id` | any of the above fields | updated `Quest` |
| DELETE | `/quests/:id` | — | `{ message, id }` |
| POST | `/quests/:id/complete` | — | `{ quest, character, xpGained, multiplierUsed, goldGained, statBoost, leveledUp }` |
| GET | `/character` | — | `Character` |
| PUT | `/character` | any of `gender`, `genderChosen`, `activeJob`, `jobLevel`, `jp` | updated `Character` |
| GET | `/achievements` | — | `Achievement[]` (computed live) |
| GET | `/shop` | — | static `ShopItem[]` |
| POST | `/shop/:id/buy` | — | `{ item, character, inventory }` |
| GET | `/inventory` | — | `InventoryItem[]` |

Rewards (`xp`, `gold`, `statGain`) are always derived server-side from a
quest's `tier`, using the same table the frontend shows in the quest form —
a client can't inflate them by sending different numbers.

## Notes / things worth knowing before you demo or grade this

- **Not yet integration-tested against a live MongoDB** in this environment
  (no `mongod` available here). The code was reviewed carefully against the
  original frontend mock logic, but run through register → complete a quest →
  buy an item once before presenting.
- Streak logic (`+1` per consecutive UTC day, resets on a gap) is new — the
  frontend always had a `streak` field but no logic behind it.
- Achievements aren't stored; they're computed fresh on every request from
  the user's stats/streak/quest history, mirroring the frontend's old
  `classStatus` logic.
