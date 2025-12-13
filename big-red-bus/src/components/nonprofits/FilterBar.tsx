import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, Heart, Tag } from "lucide-react";

export type FilterState = {
  q: string;
  category: string;
  city: string;
  minRating: number;
  sort: "name-asc" | "rating-desc";
  page: number;
  favoritesOnly: boolean;
  hasDeals: boolean;
};

type FilterBarProps = {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  availableCategories: string[];
  availableCities: string[];
  loading?: boolean;
};

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "rating-desc", label: "Rating (High to Low)" },
] as const;

export default function FilterBar({ 
  filters, 
  onChange, 
  availableCategories,
  availableCities,
  loading = false 
}: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.q);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ q: searchInput, page: 1 });
  };

  return (
    <Card className="p-6 mb-6 space-y-4 border-2 border-red-200 rounded-2xl shadow-lg">
      {/* Search Bar */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-base font-semibold text-red-600">Search Organizations</Label>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, category, or city..."
            disabled={loading}
            className="flex-1 border-2 border-red-200 focus:border-red-600"
          />
          <Button type="submit" disabled={loading} size="default" className="bg-red-600 hover:bg-red-700 text-white rounded-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value, page: 1 })}
            className="flex h-10 w-full rounded-full border-2 border-red-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            disabled={loading}
          >
            <option value="">All Categories</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <Label htmlFor="city">Location</Label>
          <select
            id="city"
            value={filters.city}
            onChange={(e) => onChange({ city: e.target.value, page: 1 })}
            className="flex h-10 w-full rounded-full border-2 border-red-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            disabled={loading}
          >
            <option value="">All Cities</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Min Rating Filter */}
        <div className="space-y-2">
          <Label htmlFor="minRating">Min Rating</Label>
          <select
            id="minRating"
            value={filters.minRating}
            onChange={(e) => onChange({ minRating: Number(e.target.value), page: 1 })}
            className="flex h-10 w-full rounded-full border-2 border-red-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            disabled={loading}
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as FilterState["sort"], page: 1 })}
            className="flex h-10 w-full rounded-full border-2 border-red-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            disabled={loading}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions (stacked on mobile, side by side on desktop) */}
        <div className="space-y-2">
          <Label>Quick Filters</Label>
          <div className="flex gap-2">
            <Button
              variant={filters.favoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => onChange({ favoritesOnly: !filters.favoritesOnly, page: 1 })}
              disabled={loading}
              className={`gap-2 flex-1 rounded-full ${filters.favoritesOnly ? "bg-red-600 hover:bg-red-700 text-white" : "border-2 border-red-600 text-red-600 hover:bg-red-50"}`}
            >
              <Heart className={`h-4 w-4 ${filters.favoritesOnly ? "fill-current" : ""}`} />
              Favorites
            </Button>
            
            <Button
              variant={filters.hasDeals ? "default" : "outline"}
              size="sm"
              onClick={() => onChange({ hasDeals: !filters.hasDeals, page: 1 })}
              disabled={loading}
              className={`gap-2 flex-1 rounded-full ${filters.hasDeals ? "bg-red-600 hover:bg-red-700 text-white" : "border-2 border-red-600 text-red-600 hover:bg-red-50"}`}
            >
              <Tag className="h-4 w-4" />
              Deals
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.q || filters.category || filters.city || filters.minRating > 0 || filters.favoritesOnly || filters.hasDeals) && (
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filters.q && <span className="mr-3">Search: <strong>{filters.q}</strong></span>}
              {filters.category && <span className="mr-3">Category: <strong>{filters.category}</strong></span>}
              {filters.city && <span className="mr-3">City: <strong>{filters.city}</strong></span>}
              {filters.minRating > 0 && <span className="mr-3">Min Rating: <strong>{filters.minRating}+</strong></span>}
              {filters.favoritesOnly && <span className="mr-3">Showing <strong>Favorites Only</strong></span>}
              {filters.hasDeals && <span className="mr-3">Showing <strong>Deals Only</strong></span>}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchInput("");
                onChange({ 
                  q: "", 
                  category: "", 
                  city: "",
                  minRating: 0,
                  favoritesOnly: false, 
                  hasDeals: false,
                  page: 1 
                });
              }}
              disabled={loading}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
