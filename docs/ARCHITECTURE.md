# Architecture — FBLA Coding & Programming

## Folder Layout

```
byte-boost/apps/web/
├─ src/
│  ├─ app/         # layout, routes, nav
│  ├─ features/
│  │  └─ items/    # CRUD feature (types, storage, hook, components)
│  ├─ pages/       # Home, Items, About
│  ├─ styles.css   # utility styles
│  └─ test/        # test setup
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
└─ ...
```

## Data Flow (Items Feature)

- `useItems` hook manages state (add, update, delete)
- State is persisted to localStorage via `saveItems`/`loadItems`
- `ItemForm` adds new items
- `ItemList` displays and deletes items
- All feature logic is isolated in `src/features/items/`

## Testing & CI
- Vitest for unit/UI tests
- GitHub Actions for CI (lint, test, build)

## Deployment
- Vercel auto-deploys on push to `main`
