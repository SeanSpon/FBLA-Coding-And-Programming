import { useState, useEffect } from 'react';

const CLAIMED_DEALS_KEY = 'big-red-bus-claimed-deals';

interface ClaimedDeal {
  dealId: string;
  organizationId: string;
  claimedAt: string;
}

export function useClaimedDeals() {
  const [claimedDeals, setClaimedDeals] = useState<ClaimedDeal[]>(() => {
    try {
      const stored = localStorage.getItem(CLAIMED_DEALS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLAIMED_DEALS_KEY, JSON.stringify(claimedDeals));
  }, [claimedDeals]);

  const claimDeal = (dealId: string, organizationId: string) => {
    const claimed: ClaimedDeal = {
      dealId,
      organizationId,
      claimedAt: new Date().toISOString(),
    };
    setClaimedDeals(prev => [...prev, claimed]);
  };

  const isDealClaimed = (dealId: string) => {
    return claimedDeals.some(d => d.dealId === dealId);
  };

  const getClaimedDealsForOrganization = (organizationId: string) => {
    return claimedDeals.filter(d => d.organizationId === organizationId);
  };

  return { claimedDeals, claimDeal, isDealClaimed, getClaimedDealsForOrganization };
}
