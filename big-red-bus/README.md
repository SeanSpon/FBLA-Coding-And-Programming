# 🚍 Big Red Bus

**Built for FBLA Coding & Programming 2025-2026 Competition**

A comprehensive platform for discovering and supporting community organizations, including nonprofits and community-focused local businesses in Kentucky.

![Big Red Bus Screenshot](public/vite.svg)

## 🎯 Project Overview

Big Red Bus helps users discover, support, and connect with local organizations through:

- **Searchable Directory**: Browse 20+ organizations with advanced filtering
- **Exclusive Deals**: Claim special offers with bot verification
- **Community Reviews**: Share experiences with verified reviews
- **Favorites System**: Save organizations for later using localStorage
- **Responsive Design**: Beautiful UI that works on all devices

## 🌟 Features

### ✅ FBLA Requirements Met

- [x] **Sort by Category**: Filter organizations by type (Food Assistance, Mental Health, Education, etc.)
- [x] **User Reviews & Ratings**: Star-based rating system with written reviews
- [x] **Favorites System**: Save and bookmark favorite organizations
- [x] **Special Deals**: Display and claim exclusive coupons and deals
- [x] **Bot Verification**: Math CAPTCHA prevents spam on reviews and deal claims

### 🚀 Additional Features

- Multi-criteria filtering (category, city, rating, deals, favorites)
- URL-persisted filter state for shareable links
- Real-time search across organization names and descriptions
- Pagination for large result sets
- Detailed organization pages with full information
- Contact form with bot verification
- Fully accessible and keyboard-navigable

## 🛠️ Tech Stack

**Frontend Framework**
- React 19
- TypeScript
- Vite (build tool)

**Styling**
- Tailwind CSS 4
- shadcn/ui components
- Framer Motion (animations)

**Routing**
- React Router v7

**Data Management**
- JSON data files
- localStorage (favorites, reviews, claimed deals)

**UI Components**
- Lucide React (icons)
- Radix UI (accessible primitives)

## 📁 Project Structure

```
big-red-bus/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── nonprofits/      # Organization-specific components
│   │   ├── BotCheck.tsx     # Math CAPTCHA
│   │   ├── DealCard.tsx     # Deal display
│   │   ├── ReviewCard.tsx   # Review display
│   │   ├── ReviewForm.tsx   # Review submission
│   │   ├── Header.tsx       # Navigation
│   │   └── Footer.tsx       # Site footer
│   ├── pages/               # Route pages
│   │   ├── Home.tsx         # Landing page
│   │   ├── Nonprofits.tsx   # Directory with filters
│   │   ├── NonprofitDetail.tsx  # Organization details
│   │   ├── About.tsx        # About FBLA project
│   │   └── Contact.tsx      # Contact form
│   ├── hooks/               # Custom React hooks
│   │   ├── useFavorites.ts  # Favorites management
│   │   ├── useReviews.ts    # Review management
│   │   └── useClaimedDeals.ts  # Deal claiming
│   ├── data/
│   │   └── organizations.json  # 20 sample organizations
│   ├── types/
│   │   └── organization.ts  # TypeScript interfaces
│   ├── router.tsx           # Route configuration
│   ├── index.css            # Global styles
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
cd big-red-bus
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
# or
pnpm build
```

Preview production build:
```bash
npm run preview
```

## 📊 Sample Data

The project includes 20 organizations across 5 categories:

- **Food Assistance** (5 orgs): Food banks, meal delivery services
- **Mental Health** (4 orgs): Counseling centers, crisis support
- **Education** (3 orgs): Tutoring, STEAM programs, Montessori schools
- **Local Business** (4 orgs): Social enterprises, community-focused shops
- **Community Development** (4 orgs): Housing, workforce training, environmental

Each organization includes:
- Full contact information
- Category and location
- Rating and review count
- 0-3 exclusive deals
- Detailed descriptions

## 🎨 Design System

**Colors**
- Primary: `#E94F37` (Red - for CTAs and accents)
- Secondary: `#FFF8F0` (Cream - background)
- Accent: `#52B788` (Green - for deals and success states)
- Text: `#1A1A1A` (Dark gray)
- Text Light: `#666666` (Medium gray)
- Border: `#E5E5E5` (Light gray)

**Typography**
- Headings: Inter Bold / Poppins Bold
- Body: Inter Regular
- Monospace (codes): JetBrains Mono

**Components**
- Clean card-based layouts
- Consistent spacing and borders
- Hover effects and transitions
- Accessible focus states

## 🔒 Bot Verification

The app includes a simple math CAPTCHA to prevent spam:

- **Where it's used**: Review submissions, deal claims, contact form
- **How it works**: Users solve a simple addition problem (e.g., "What is 7 + 3?")
- **User experience**: Quick, non-intrusive, accessible

## 💾 Data Persistence

All user data is stored locally in the browser using localStorage:

- **Favorites**: Array of organization IDs
- **Reviews**: Array of review objects with ratings and comments
- **Claimed Deals**: Array of deal IDs with claim timestamps

This approach:
- ✅ Works without a backend/database
- ✅ Respects user privacy (no tracking)
- ✅ Provides personalized experience
- ⚠️ Data is device-specific (not synced across devices)

## 🎯 User Flows

### 1. Discovering Organizations
Home → Browse Directory → Apply Filters → View Organization → Save to Favorites

### 2. Claiming a Deal
Directory → Organization Detail → View Deals → Claim Deal → Bot Verification → Code Revealed

### 3. Leaving a Review
Organization Detail → Write Review → Fill Form → Bot Verification → Review Posted

### 4. Contacting Us
Home/Header → Contact → Fill Form → Bot Verification → Message Sent

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile** (< 768px): Single column, hamburger menu
- **Tablet** (768px - 1024px): 2-column grid
- **Desktop** (1024px+): 3-column grid, full navigation

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Alt text on images
- Color contrast ratios meet WCAG AA

## 🚀 Deployment

The app can be deployed to:

**Recommended Platforms**
- Vercel (automatic from Git)
- Netlify (automatic from Git)
- Cloudflare Pages

**Deployment Steps** (Vercel example)
1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy!

## 🧪 Testing

To test the application:

1. **Browse Directory**: Try different filter combinations
2. **Favorites**: Add/remove organizations from favorites
3. **Search**: Search for keywords across organizations
4. **Reviews**: Submit a review (test bot check)
5. **Deals**: Claim a deal (test bot check)
6. **Responsive**: Resize browser to test mobile/tablet views
7. **Persistence**: Reload page to ensure favorites/reviews persist

## 📝 License

Built for educational purposes as part of FBLA Coding & Programming 2025-2026.

## 👥 Credits

Developed for the FBLA Coding & Programming Competition

**Technologies Used**
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router
- Lucide Icons
- Framer Motion

---

## 🎓 About FBLA Challenge

This project fulfills all requirements of the FBLA Coding & Programming competition:

1. ✅ Tool helps users discover local businesses
2. ✅ Businesses can be sorted by category
3. ✅ Users can leave reviews and ratings
4. ✅ Users can save/bookmark favorites
5. ✅ Special deals and coupons are displayed
6. ✅ Bot verification is implemented

**Bonus Features Implemented**
- Comprehensive filtering system
- URL state persistence
- Clean, professional design
- Full TypeScript typing
- Responsive mobile design
- Accessible UI components

---

**Ready to make a difference in your community? Start exploring! 🚍**
