# FBLA-Coding-And-Programming
FBLA Coding And Programming


Plan
🧭 What we’re building (in plain english)

A desktop app (runs on any laptop without internet) that helps people find & support local small businesses.

People can browse by category, sort by rating, leave reviews, favorite businesses, and see deals/coupons.

It’s built like a website inside a desktop shell, so it looks modern but works offline for competition.

🧱 Why these tools (and what they do)

Electron (desktop wrapper): turns our web app into a real desktop app (.exe / .dmg). No browser needed. Offline friendly.

React + Vite + TypeScript (frontend): fast UI framework (React), speedy dev tooling (Vite), and fewer bugs (TypeScript catches mistakes).

SQLite (database): a single file that stores all our data (businesses, reviews, favorites). Simple to ship, perfect offline.

Prisma (database toolkit/ORM): lets us talk to SQLite using clean code instead of raw SQL. Safer, faster dev.

Zustand or React Query (state/data): keeps UI data in sync and easy to manage. (We can keep this super light.)

Vitest + Playwright (tests): quick checks so judges don’t hit bugs during demo.

electron-builder (packaging): creates the installer so the app runs on judge laptops.

tl;dr: React = what you see; SQLite+Prisma = where data lives; Electron = how it runs offline as a desktop app.

🧩 How the pieces talk (simple mental model)

React UI (buttons/inputs) asks for data →

Electron forwards that request to a tiny database layer →

Prisma reads/writes the SQLite file →

Data comes back to React → UI updates instantly.

No internet, no servers. Everything is on the laptop.

🗂️ Project structure (what folders mean)
byte-boost/
├─ apps/
│  ├─ desktop/        # Electron shell (startup code for the desktop app)
│  └─ web/            # React app (UI screens, components)
├─ packages/
│  ├─ db/             # Prisma schema + DB access functions (get, add, update)
│  └─ ui/             # Reusable buttons, cards, modals (shared look)
├─ prisma/
│  └─ schema.prisma   # the data shape (Business, Review, User, Favorite)
├─ tests/             # unit + e2e tests
├─ scripts/           # seed script to preload local businesses
├─ README.md          # how to run & what features we built
└─ .github/workflows/ # (optional) CI to auto-test/build on pushes

🧬 Data model (translated to human)

Business: name, category (food/retail/etc), address, city, hours, average rating, # of reviews, hasDeal?, dealText.

User: simple local username (no logins/PII).

Review: which business, which user, rating (1–5), text, timestamp.

Favorite: which user starred which business.

Reason: keeps it minimal but covers all required features (ratings, sorting, favorites, deals).

✅ Feature checklist (what we’ll actually ship)

Browse + filter by category (Food/Retail/Services/etc.)

Sort by rating (show the best first)

Reviews & ratings (create, view, average score)

Favorites/bookmarks (save places you like)

Deals/coupons (flag businesses with specials)

Bot check on review submit (simple math or checkbox w/ cooldown)

Local recommendations (bonus “smart” feature): “Because you liked coffee shops, here are similar places” — computed locally from your favorites/ratings. No AI needed.

🖥️ Screens we’ll build (so Zach sees the end goal)

Explore: search bar, category chips, “Deals” toggle, sorting.

Business Details: info, hours, rating, reviews list, “add review,” “favorite,” and any current deal.

Favorites: your starred places.

About: credits (your names), how it works, tech used.

🧪 Quality plan (no flaky demo)

Unit tests: average rating math, sort/filter logic, validation (ratings 1–5, non-empty review).

End-to-end test: open app → filter → open a business → add a review → favorite → confirm UI updates.

Packaging test: build installer → run on a clean machine without internet.

🚦 Definition of Done (for every feature)

UI works and looks decent

Data saved in SQLite (persists after restart)

Validation + error messages (no silent fails)

Unit test(s) written

README/docs updated

Works offline

🧭 Timeline (week-by-week plan)

Week 1 – Foundation

Set up repo + monorepo folders.

Add Electron, React/Vite, TypeScript.

Add Prisma + SQLite; create schema; write seed script (30–40 local businesses).

Render Explore page with seeded data (list + basic filter UI).

Week 2 – Core features

Category filters + sort by rating (working against real DB).

Business Details page (reviews list, average rating).

Add Review flow (with bot check); update average on submit.

Favorites (toggle on detail card; Favorites page shows saved list).

Week 3 – Polish

Deals flag + “show deals only” filter.

Empty states (no results, no favorites).

Accessibility pass (keyboard nav, readable contrast).

Local recommendations (“Because you liked…”).

Week 4 – Testing & Packaging

Unit + e2e tests.

Finalize README (how to run, features, libs, “why these choices”).

Package installers (Win/mac). Run on a clean laptop offline.

Capture screenshots/GIFs for presentation.

👷 Roles (so you don’t step on each other)

Sean (you): architecture, data layer (Prisma/SQLite), packaging, CI, and tricky UI states.

Zach: pages & components (Explore, Details, Favorites), validation UX, tests, docs/screenshots.

Pair on the recommendations feature.

You both code React; you own different layers to move faster.

🔄 Workflow (how we commit + keep monday in sync)

Branch name pattern: feature/TASK-xx-short-name (paste the Monday Item ID into branch names and PR titles so automations update statuses).

Small PRs only (easier to review/fix).

Each PR updates README or tests if it changes behavior.

🧯 Risks & how we avoid them

Packaging pain: do a packaging test by end of Week 2 (not last minute).

DB corruption: keep backup copy of seed DB; add basic try/catch + error banners in UI.

UI jank: keep components simple, load fast, avoid heavy libs.

Demo nerves: script a 2–3 min flow and practice. Keep backup screenshots if something breaks.

📚 What Zach needs to know (super simple)

We’re making a desktop app that’s just a fancy website bundled so it runs offline.

React = the screens. SQLite = the saved data. Prisma = the translator between code and database.

We save everything locally, so judges can run it with no wifi.

Our features map directly to what FBLA wants: browse, sort, rate/review, favorite, deals, bot check.

We’ll test and package it so it doesn’t crash in front of people.

🧾 Deliverables checklist (what we hand in / show)

Installer (desktop app)

Source code (clean, documented)

README (how to run, features, libraries)

Design notes (why we chose these tools; data model diagram)

Screenshots/GIFs

Short demo script (exact clicks we’ll do)