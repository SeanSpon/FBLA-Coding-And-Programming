import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import OrgCard from "@/components/nonprofits/OrgCard";
import FilterBar, { type FilterState } from "@/components/nonprofits/FilterBar";
import { Button } from "@/components/ui/button";
import organizationsData from "@/data/organizations.json";
import type { Organization } from "@/types/organization";
import { useFavorites } from "@/hooks/useFavorites";

const organizations = organizationsData as Organization[];

const ITEMS_PER_PAGE = 9;

export default function Nonprofits() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>({
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    minRating: Number(searchParams.get("minRating")) || 0,
    sort: (searchParams.get("sort") as FilterState["sort"]) || "rating-desc",
    page: Number(searchParams.get("page")) || 1,
    favoritesOnly: searchParams.get("favoritesOnly") === "true",
    hasDeals: searchParams.get("hasDeals") === "true",
  });

  // Update URL when filters change
  const handleFilterChange = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.q) params.set("q", newFilters.q);
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.minRating > 0) params.set("minRating", newFilters.minRating.toString());
    if (newFilters.sort !== "rating-desc") params.set("sort", newFilters.sort);
    if (newFilters.page > 1) params.set("page", newFilters.page.toString());
    if (newFilters.favoritesOnly) params.set("favoritesOnly", "true");
    if (newFilters.hasDeals) params.set("hasDeals", "true");
    
    setSearchParams(params);
  };

  // Get unique categories and cities for filter dropdowns
  const availableCategories = useMemo(() => 
    Array.from(new Set(organizations.map(org => org.category))).sort(),
    []
  );

  const availableCities = useMemo(() => 
    Array.from(new Set(organizations.map(org => org.city))).sort(),
    []
  );

  // Filter and sort organizations
  const filteredOrgs = useMemo(() => {
    let result = [...organizations];

    // Search filter
    if (filters.q) {
      const query = filters.q.toLowerCase();
      result = result.filter(org => 
        org.name.toLowerCase().includes(query) ||
        org.description.toLowerCase().includes(query) ||
        org.category.toLowerCase().includes(query) ||
        org.city.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(org => org.category === filters.category);
    }

    // City filter
    if (filters.city) {
      result = result.filter(org => org.city === filters.city);
    }

    // Min rating filter
    if (filters.minRating > 0) {
      result = result.filter(org => org.rating >= filters.minRating);
    }

    // Favorites only filter
    if (filters.favoritesOnly) {
      result = result.filter(org => favorites.includes(org.id));
    }

    // Has deals filter
    if (filters.hasDeals) {
      result = result.filter(org => org.deals && org.deals.length > 0);
    }

    // Sort
    if (filters.sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [organizations, filters, favorites]);

  // Pagination
  const totalPages = Math.ceil(filteredOrgs.length / ITEMS_PER_PAGE);
  const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
  const paginatedOrgs = filteredOrgs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    handleFilterChange({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Community Organization <span className="text-red-600">Directory</span>
        </h1>
        <p className="text-lg text-text-light max-w-2xl mx-auto">
          Discover nonprofits and businesses in your area
        </p>
      </div>

      {/* Filters */}
      <FilterBar 
        filters={filters}
        onChange={handleFilterChange}
        availableCategories={availableCategories}
        availableCities={availableCities}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-light">
          Showing <strong className="text-text">{paginatedOrgs.length}</strong> of{" "}
          <strong className="text-text">{filteredOrgs.length}</strong> organizations
        </p>
        {filteredOrgs.length === 0 && (
          <p className="text-text-light italic">
            No organizations match your filters. Try adjusting your search.
          </p>
        )}
      </div>

      {/* Organization Grid */}
      {paginatedOrgs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedOrgs.map((org) => (
            <OrgCard key={org.id} org={org} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No organizations found</h3>
          <p className="text-text-light mb-6">
            Try adjusting your search criteria or clearing filters
          </p>
          <Button 
            onClick={() => handleFilterChange({ 
              q: "", 
              category: "", 
              city: "",
              minRating: 0,
              favoritesOnly: false, 
              hasDeals: false,
              page: 1 
            })}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === filters.page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
              className={page === filters.page ? "bg-red-600 hover:bg-red-700 text-white rounded-full" : "rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50"}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
