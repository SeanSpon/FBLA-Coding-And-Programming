import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'big-red-bus-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (orgId: string) => {
    setFavorites(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const isFavorite = (orgId: string) => favorites.includes(orgId);

  return { favorites, toggleFavorite, isFavorite };
}
