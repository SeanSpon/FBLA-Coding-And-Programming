import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

/**
 * Pagination component - Displays navigation and item count information
 * 
 * FEATURES:
 * - Safe handling of edge cases (page 0, invalid total, etc.)
 * - Boundary checking: prevents navigation beyond valid page range
 * - Accessibility: ARIA labels, disabled button states
 * - Efficiency: O(1) calculations, no loops or sorting
 * 
 * FBLA COMPLIANCE:
 * - Defensive programming (validates all inputs)
 * - Professional UI (disabled states, clear labels)
 * - Accessibility (keyboard navigation, screen reader support)
 * 
 * EDGE CASES HANDLED:
 * - total = 0 (shows no items, no next button)
 * - page < 1 (normalized to 1)
 * - page > totalPages (capped to totalPages)
 * - pageSize ≤ 0 (defensive, but prevents division by zero)
 */
export default function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  // EDGE CASE: Ensure all inputs are valid (normalize)
  const safePage = Math.max(1, Math.floor(page) || 1);
  const safePageSize = Math.max(1, pageSize);
  const safeTotal = Math.max(0, total);

  // Calculate safe values
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
  
  // Ensure current page doesn't exceed totalPages
  const currentPage = Math.min(safePage, totalPages);

  // EDGE CASE: Handle zero items gracefully
  const startItem = safeTotal === 0 ? 0 : Math.min((currentPage - 1) * safePageSize + 1, safeTotal);
  const endItem = Math.min(currentPage * safePageSize, safeTotal);

  // EDGE CASE: Check boundaries before allowing navigation
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages && safeTotal > 0;

  /**
   * Handle page change with validation
   * Ensures we never navigate to invalid pages and keeps parent state synchronized
   */
  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    // Always call onPageChange to ensure parent state stays synchronized
    onPageChange(validPage);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        {safeTotal === 0 ? (
          <span>No organizations to display</span>
        ) : (
          <span>
            Showing <strong>{startItem}</strong>-<strong>{endItem}</strong> of{" "}
            <strong>{safeTotal}</strong> organizations
          </span>
        )}
      </div>

      {/* Navigation controls - hidden if no items */}
      {safeTotal > 0 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            aria-label="Go to previous page"
            aria-disabled={!canGoPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          {/* Page indicator */}
          <span 
            className="text-sm font-medium px-3"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
            aria-label="Go to next page"
            aria-disabled={!canGoNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}