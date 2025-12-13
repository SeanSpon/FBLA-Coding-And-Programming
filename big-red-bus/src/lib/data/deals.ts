// deals.ts - Static deals data for organizations
// In a real app, this would come from the database

export type Deal = {
  title: string;
  description: string;
  code?: string; // Optional coupon code
  expires?: string; // Optional expiration date
};

// Map of organization ID to deals
export const dealsMap: Record<string, Deal[]> = {
  // Common Grounds Café
  "1000": [
    {
      title: "Free Coffee on First Visit",
      description: "Get a free coffee (any size) on your first visit",
      code: "FIRSTCOFFEE",
      expires: "2025-12-31",
    },
  ],
  // Second Chance Thrift Store
  "1001": [
    {
      title: "20% Off First Purchase",
      description: "Get 20% off your first purchase at our thrift store",
      code: "NEWCUSTOMER20",
      expires: "2025-12-31",
    },
  ],
  // Community Bookstore
  "1002": [
    {
      title: "15% Off Any Book",
      description: "15% discount on any book purchase",
      code: "READMORE15",
      expires: "2025-09-30",
    },
  ],
  // Green Earth Market
  "1003": [
    {
      title: "10% Off First Order",
      description: "Save 10% on your first shopping trip",
      code: "GREEN10",
      expires: "2025-12-31",
    },
  ],
  // Healing Hands Wellness
  "1004": [
    {
      title: "First Session Half Price",
      description: "Get 50% off your first wellness session",
      code: "WELLNESS50",
      expires: "2025-12-31",
    },
  ],
  // Tech for All
  "1005": [
    {
      title: "Free Computer Class",
      description: "Attend one free introductory computer class",
      code: "LEARNFREE",
      expires: "2025-12-31",
    },
  ],
  // Artisan Collective
  "1006": [
    {
      title: "10% Off Handmade Items",
      description: "Support local artists with 10% off any handmade item",
      code: "LOCAL10",
      expires: "2025-12-31",
    },
  ],
  // Fresh Start Bakery
  "1008": [
    {
      title: "Buy 6 Get 1 Free",
      description: "Purchase 6 pastries and get the 7th free",
      code: "BAKERY7",
      expires: "2025-12-31",
    },
  ],
  // Unity Yoga Studio
  "1010": [
    {
      title: "First Class Free",
      description: "Try your first yoga class completely free",
      expires: "2025-12-31",
    },
  ],
  // Threads of Hope
  "1013": [
    {
      title: "15% Off Custom Orders",
      description: "Get 15% off any custom sewing order",
      code: "CUSTOM15",
      expires: "2025-12-31",
    },
  ],
  // Bright Futures Tutoring
  "1014": [
    {
      title: "First Tutoring Session Free",
      description: "Try our tutoring services with a free first session",
      code: "TUTOR1FREE",
      expires: "2025-12-31",
    },
  ],
};

/**
 * Get deals for a specific organization
 * @param orgId - Organization ID
 * @returns Array of deals or empty array if none
 */
export function getDealsForOrg(orgId: string | number): Deal[] {
  return dealsMap[String(orgId)] || [];
}

/**
 * Check if an organization has any deals
 * @param orgId - Organization ID
 * @returns true if organization has deals
 */
export function hasDeals(orgId: string | number): boolean {
  return getDealsForOrg(orgId).length > 0;
}

/**
 * Get all organization IDs that have deals
 * @returns Array of organization IDs with deals
 */
export function getOrgsWithDeals(): string[] {
  return Object.keys(dealsMap);
}

/**
 * Check if a deal is expired
 * @param expires - Expiration date string (YYYY-MM-DD)
 * @returns true if expired or no expiration date
 */
export function isDealExpired(expires?: string): boolean {
  if (!expires) return false;
  const expireDate = new Date(expires);
  const now = new Date();
  return expireDate < now;
}

