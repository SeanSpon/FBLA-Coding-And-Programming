# Big Red Bus - Community Impact Finder
**FBLA Coding And Programming 2025-2026**

## Overview

Big Red Bus is a web platform connecting people with nonprofit organizations and community-focused businesses making a positive impact. The application helps users discover, support, and engage with local organizations through features like search, reviews, deals, and favorites.

### Key Features

✅ **Search & Filter** - Find organizations by name, category, city, and rating  
✅ **User Reviews** - Leave ratings and reviews for organizations (with bot verification)  
✅ **Favorites** - Save your favorite organizations for quick access  
✅ **Special Deals** - Discover and claim exclusive deals from community businesses  
✅ **Detailed Profiles** - View comprehensive organization information  
✅ **Responsive Design** - Beautiful, accessible UI that works on all devices

## Tech Stack

**Frontend:**
- React 19 + TypeScript - Modern, type-safe UI development
- Vite - Fast build tooling and dev server
- React Router v7 - Client-side routing
- Tailwind CSS 4 - Utility-first styling
- shadcn/ui - High-quality, accessible components
- Framer Motion - Smooth animations
- Lucide React - Beautiful icons

**State Management:**
- localStorage - Client-side persistence for favorites, reviews, claimed deals
- React Hooks - Modern state management patterns

**Development Tools:**
- ESLint - Code quality
- TypeScript - Type safety throughout

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/FBLA-Coding-And-Programming.git
cd FBLA-Coding-And-Programming

# Install dependencies
cd big-red-bus
npm install

# Start the development server
npm run dev
```

The web app will start on `http://localhost:5173`.

### Available Scripts

**Root level:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
FBLA-Coding-And-Programming/
├── big-red-bus/                 # Main web application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── nonprofits/     # Organization cards, filters
│   │   │   ├── DealCard.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   └── BotCheck.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Nonprofits.tsx
│   │   │   ├── NonprofitDetail.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useFavorites.ts
│   │   │   ├── useReviews.ts
│   │   │   └── useClaimedDeals.ts
│   │   ├── data/
│   │   │   └── organizations.json  # Organization data
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   ├── format.ts
│   │   │   └── data/deals.ts
│   │   └── router.tsx
│   └── package.json
└── docs/                        # Documentation
    ├── ARCHITECTURE.md
    ├── REQUIREMENTS.md
    ├── PRESENTATION.md
    └── FBLA_COMPLIANCE.md
```

## Data Storage

All user data (favorites, reviews, claimed deals) is stored locally in the browser using localStorage. This approach:
- ✅ Works without a backend/database
- ✅ Respects user privacy
- ✅ Provides personalized experience
- ⚠️ Data is device-specific

## Documentation

- [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) — FBLA requirements mapping
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Technical architecture
- [`docs/PRESENTATION.md`](docs/PRESENTATION.md) — Presentation guide
- [`docs/FBLA_COMPLIANCE.md`](docs/FBLA_COMPLIANCE.md) — Competition compliance

## FBLA Competition Requirements

This project fulfills all requirements of the FBLA Coding & Programming competition:

1. ✅ Tool helps users discover local businesses
2. ✅ Businesses can be sorted by category
3. ✅ Users can leave reviews and ratings
4. ✅ Users can save/bookmark favorites
5. ✅ Special deals and coupons are displayed
6. ✅ Bot verification is implemented

## Development

### Running in Development

```bash
cd big-red-bus
npm run dev
```

### Building for Production

```bash
cd big-red-bus
npm run build
```

The production build will be in `big-red-bus/dist/`.

### Linting

```bash
cd big-red-bus
npm run lint
```

## License

Built for educational purposes as part of FBLA Coding & Programming 2025-2026.

---

**Ready to make a difference in your community? Start exploring! 🚍**
