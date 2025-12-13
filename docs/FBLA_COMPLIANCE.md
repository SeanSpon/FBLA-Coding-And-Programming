# FBLA Coding & Programming Competition - Compliance Documentation

## Competition Topic Alignment

**Topic:** "Develop a web application to help users find and support small, LOCAL businesses in their community."

**Our Solution:** Big Red Bus - Community Impact Finder

We've positioned the application as a hybrid platform featuring both **nonprofits** and **community-focused small businesses** (social enterprises, thrift stores, community cafés, etc.) that strengthen local communities. This directly addresses the competition requirements while adding value through supporting organizations with social missions.

### How We Address "Small, LOCAL Businesses":
- Featured community businesses are local Louisville-area establishments
- Each entry includes address, phone, hours, and location data
- Filtering by city and state ensures local discovery
- Many featured organizations are social enterprises (businesses with community missions)
- Examples: Second Chance Thrift Store, Common Grounds Café, Fresh Start Bakery, etc.

---

## Required Features Implementation

### 1. Search & Discovery ✅
- **Text search** by organization name, cause, or city
- **Filter by location** (state, city)
- **Filter by category** (cause/organization types)
- **Filter by rating** (minimum star rating)
- **Sort options** (alphabetical, rating, city)
- **"Show Deals Only"** filter to find organizations with special offers

**Code References:**
- Search/Filter: `big-red-bus/src/components/nonprofits/FilterBar.tsx`
- API integration: `big-red-bus/src/lib/api.ts`

### 2. Reviews & Ratings ✅
- **View ratings** from Google Places API
- **Leave reviews** with star rating (1-5) and text comment
- **User name** for review attribution
- **Bot verification** before submitting (math CAPTCHA)
- **Reviews persist** in localStorage
- **Combined ratings** (Google + user reviews)

**Code References:**
- Review form: `big-red-bus/src/components/ReviewForm.tsx`
- Review hook: `big-red-bus/src/lib/hooks/useReviews.ts`
- Bot check: `big-red-bus/src/components/BotCheck.tsx`

### 3. Favorites/Bookmarking ✅
- **Save favorites** with heart icon on cards
- **Persistent storage** via localStorage
- **Filter by favorites** to view saved organizations
- **Visual indicators** (filled heart icon for favorited)
- **Favorite count** displayed on detail pages

**Code References:**
- Favorites hook: `big-red-bus/src/lib/hooks/useFavorites.ts`
- Integration: `big-red-bus/src/components/nonprofits/OrgCard.tsx`

### 4. Deals & Coupons ✅
- **Special offers** displayed on organization profiles
- **Coupon codes** with copy-to-clipboard functionality
- **Expiration dates** clearly shown
- **"Claim Deal"** button with bot verification
- **Track claimed deals** in localStorage
- **"Deals Available" badge** on organization cards
- **Filter by deals** to find organizations with offers

**Code References:**
- Deal card: `big-red-bus/src/components/DealCard.tsx`
- Deals data: `big-red-bus/src/lib/data/deals.ts`
- Claimed deals hook: `big-red-bus/src/lib/hooks/useClaimedDeals.ts`

### 5. Bot Verification ✅
- **Simple math CAPTCHA** (addition of two random numbers)
- **Required before** submitting reviews or claiming deals
- **User-friendly** with clear error messages
- **Accessible** keyboard navigation

**Code References:**
- Bot check component: `big-red-bus/src/components/BotCheck.tsx`
- Dialog wrapper: `big-red-bus/src/components/BotCheckDialog.tsx`

---

## Technical Requirements

### Code Quality ✅
- **TypeScript** throughout for type safety
- **Clean architecture** with separation of concerns
- **Custom hooks** for reusable logic
- **Component composition** following React best practices
- **Consistent code style** with ESLint
- **Well-documented code** with JSDoc comments

### User Experience ✅
- **Responsive design** works on mobile, tablet, and desktop
- **Accessible** ARIA labels, keyboard navigation, semantic HTML
- **Fast performance** client-side filtering, optimized rendering
- **Intuitive UI** clear labeling, visual feedback
- **Error handling** graceful degradation, helpful messages

### Data Management ✅
- **Backend API** Express.js server with SQLite database
- **Frontend state** localStorage for user preferences
- **External API** Google Places for enhanced data
- **Data persistence** reviews, favorites, and claimed deals survive page reloads

---

## Libraries & Frameworks Used

### Core Framework
- **React 19** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible component library
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### Routing & Navigation
- **React Router DOM v7** - Client-side routing with data loading

### Backend
- **Express.js** - Web server framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Concurrently** - Run multiple dev servers

**Why these choices:**
- React: Industry-standard, large ecosystem, excellent documentation
- TypeScript: Catches bugs early, better IDE support
- Tailwind: Rapid prototyping without context switching
- shadcn/ui: Accessible components we can customize
- localStorage: Simple persistence without server complexity
- SQLite: Easy to set up, portable, perfect for this use case

---

## Accessibility Features

- **Semantic HTML** proper heading hierarchy, meaningful elements
- **ARIA labels** on interactive elements (buttons, links, form controls)
- **Keyboard navigation** all features accessible without mouse
- **Focus management** visible focus indicators, logical tab order
- **Screen reader support** meaningful labels and announcements
- **Color contrast** meets WCAG AA standards
- **Responsive text** scales properly on all devices

---

## Testing Approach

### Manual Testing Checklist
- ✅ Search and filters work correctly
- ✅ Reviews can be submitted and displayed
- ✅ Favorites persist across page reloads
- ✅ Deals can be claimed with verification
- ✅ Bot check prevents spam
- ✅ Mobile responsive design works
- ✅ Keyboard navigation functions
- ✅ Works in Chrome, Firefox, Safari, Edge

### User Testing
- Tested with 5+ users for feedback
- Verified intuitive navigation
- Confirmed all features are discoverable
- Validated accessibility with keyboard-only usage

---

## Deployment & Demo

- **Live URL:** [Vercel Deployment Link]
- **Source Code:** GitHub repository
- **API Server:** Runs locally on port 8080
- **Web App:** Runs on Vite dev server (port 5173)

---

## Innovation & Extra Features

Beyond the basic requirements, we added:

1. **Google Places Integration** - Real business data with reviews, hours, photos
2. **Detailed Filtering** - Multiple simultaneous filters (status, hours, photos, min reviews)
3. **Combined Ratings** - Merges Google reviews with user reviews
4. **URL State Management** - Shareable links with active filters
5. **Empty States** - Helpful messages when no results found
6. **Loading States** - Clear feedback during data fetching
7. **Deal Expiration** - Automatic expiry checking for deals
8. **Location Services** - Nearby search functionality
9. **Pagination** - Handles large result sets efficiently
10. **Animation** - Smooth transitions for better UX

---

## Summary

Big Red Bus fully addresses the FBLA Coding & Programming competition requirements by providing a comprehensive platform for discovering and supporting local community organizations and businesses. We've implemented all required features (search, reviews, favorites, deals, bot verification) with high-quality code, excellent user experience, and accessibility in mind.

The application showcases modern web development practices, thoughtful design decisions, and a genuine focus on community impact—perfect for the FBLA competition theme.

