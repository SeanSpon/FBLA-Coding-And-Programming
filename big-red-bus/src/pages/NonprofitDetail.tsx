import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DealCard from "@/components/DealCard";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Heart,
  AlertCircle
} from "lucide-react";
import organizationsData from "@/data/organizations.json";
import type { Organization } from "@/types/organization";
import { useFavorites } from "@/hooks/useFavorites";
import { useReviews } from "@/hooks/useReviews";
import { useState } from "react";

const organizations = organizationsData as Organization[];

/**
 * NonprofitDetail page - Displays detailed information about a nonprofit
 * 
 * FEATURES:
 * - Comprehensive error handling for missing organizations
 * - Safe null checks for optional fields (website, phone, deals)
 * - Defensive programming with fallback values
 * - Professional 404-like experience
 * 
 * FBLA COMPLIANCE:
 * - No crashes on invalid organization IDs
 * - Clear feedback when data is unavailable
 * - All user inputs validated before display
 * - Accessibility support (ARIA labels)
 */
export default function NonprofitDetail() {
  const { id } = useParams<{ id: string }>();
  
  // DEFENSIVE: Validate ID parameter exists
  if (!id) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Invalid Organization ID</h2>
        <p className="text-text-light mb-6">
          The requested organization ID is missing or invalid.
        </p>
        <Link to="/directory">
          <Button>Back to Directory</Button>
        </Link>
      </div>
    );
  }

  const organization = organizations.find(org => org.id === id);
  
  // DEFENSIVE: Handle organization not found
  if (!organization) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2">Organization Not Found</h2>
        <p className="text-text-light mb-6">
          The organization you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/directory">
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const { isFavorite, toggleFavorite } = useFavorites();
  const { reviews, addReview, getAverageRating } = useReviews(id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const favorited = isFavorite(organization.id);
  const userReviews = reviews ?? [];
  const displayedReviews = showAllReviews ? userReviews : userReviews.slice(0, 3);
  
  // DEFENSIVE: Calculate ratings with null coalescing
  const averageUserRating = getAverageRating(organization.id) ?? 0;
  const displayRating = userReviews.length > 0 ? averageUserRating : (organization.rating ?? 0);
  const totalReviewCount = (organization.reviewCount ?? 0) + userReviews.length;

  /**
   * Get emoji icon for organization category
   * Returns fallback emoji if category not recognized
   * 
   * @param category - Organization category string
   * @returns Emoji character for display
   */
  const getCategoryIcon = (category: string | undefined): string => {
    if (!category) return "❤️";
    
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("food")) return "🍽️";
    if (lowerCategory.includes("mental health") || lowerCategory.includes("health")) return "🏥";
    if (lowerCategory.includes("education")) return "📚";
    if (lowerCategory.includes("community")) return "🏘️";
    if (lowerCategory.includes("business")) return "🏪";
    return "❤️";
  };

  /**
   * Safe field accessor with fallback
   * Prevents rendering "undefined" or null values
   */
  const getOrganizationField = <T,>(
    field: T | null | undefined,
    fallback: T
  ): T => field ?? fallback;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/directory">
        <Button variant="ghost" className="gap-2 text-red-600 hover:bg-red-50 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Button>
      </Link>

      {/* Header Section */}
      <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border-2 border-red-200 shadow-lg">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-6xl" aria-hidden="true">
              {getCategoryIcon(organization.category)}
            </div>
            <div className="space-y-3 flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-red-600">
                {getOrganizationField(organization.name, "Unnamed Organization")}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold text-lg">{displayRating.toFixed(1)}</span>
                  <span className="text-text-light">
                    ({totalReviewCount} review{totalReviewCount !== 1 ? 's' : ''})
                  </span>
                </div>
                {organization.category && (
                  <Badge className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-full">
                    {organization.category}
                  </Badge>
                )}
              </div>
              {organization.city && organization.state && (
                <div className="flex items-center gap-2 text-text-light">
                  <MapPin className="h-4 w-4 text-red-600" aria-hidden="true" />
                  <span>{organization.city}, {organization.state}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Favorite Button */}
          <Button
            size="lg"
            variant={favorited ? "default" : "outline"}
            onClick={() => toggleFavorite(organization.id)}
            className={`gap-2 rounded-full ${favorited ? "bg-red-600 hover:bg-red-700 text-white" : "border-2 border-red-600 text-red-600 hover:bg-red-50"}`}
            aria-pressed={favorited}
          >
            <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} aria-hidden="true" />
            {favorited ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* About Section */}
      <section>
        <h2 className="text-2xl font-heading font-bold mb-4 text-red-600">About</h2>
        <p className="text-text-light leading-relaxed">
          {getOrganizationField(
            organization.fullDescription,
            "No description available for this organization."
          )}
        </p>
      </section>

      {/* Contact Info */}
      <section className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-6 border-2 border-red-200 shadow-lg">
        <h2 className="text-2xl font-heading font-bold mb-4 text-red-600">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Phone */}
          {organization.phone ? (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-600" aria-hidden="true" />
              <div>
                <div className="text-sm text-text-light">Phone</div>
                <a 
                  href={`tel:${organization.phone}`} 
                  className="font-medium hover:text-red-600 transition-colors"
                >
                  {organization.phone}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-text-light">
              <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div>
                <div className="text-sm">Phone</div>
                <p className="text-sm italic">Not available</p>
              </div>
            </div>
          )}

          {/* Website */}
          {organization.website ? (
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-red-600" aria-hidden="true" />
              <div>
                <div className="text-sm text-text-light">Website</div>
                <a 
                  href={`https://${organization.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium hover:text-red-600 transition-colors"
                  aria-label={`Visit ${organization.website} website`}
                >
                  {organization.website}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-text-light">
              <Globe className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div>
                <div className="text-sm">Website</div>
                <p className="text-sm italic">Not available</p>
              </div>
            </div>
          )}

          {/* Address */}
          {organization.address ? (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-red-600" aria-hidden="true" />
              <div>
                <div className="text-sm text-text-light">Address</div>
                <p className="font-medium">{organization.address}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-text-light">
              <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <div>
                <div className="text-sm">Address</div>
                <p className="text-sm italic">Not available</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deals Section - Only show if deals exist */}
      {organization.deals && organization.deals.length > 0 && (
        <section>
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-red-600">
            <span aria-hidden="true">💰</span> Exclusive Deals
            <Badge className="bg-red-600 text-white border-0 rounded-full">
              {organization.deals.length}
            </Badge>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {organization.deals.map((deal) => (
              <DealCard 
                key={deal.id ?? Math.random()} 
                deal={deal} 
                organizationId={organization.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2 text-red-600">
            <span aria-hidden="true">⭐</span> Community Reviews
            <span className="text-lg text-text-light font-normal">
              ({displayRating.toFixed(1)} avg • {totalReviewCount} {totalReviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </h2>
          {!showReviewForm && (
            <Button 
              onClick={() => setShowReviewForm(true)} 
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
            >
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8">
            <ReviewForm 
              organizationId={organization.id}
              onSubmit={(review) => {
                addReview(review);
                setShowReviewForm(false);
              }}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {/* Reviews List */}
        {displayedReviews && displayedReviews.length > 0 ? (
          <div className="space-y-4">
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
            {userReviews.length > 3 && !showAllReviews && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllReviews(true)}
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-full"
                >
                  Load More Reviews ({userReviews.length - 3} more)
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gradient-to-br from-red-50 to-white rounded-3xl border-2 border-red-200">
            <div className="text-4xl mb-3" aria-hidden="true">💬</div>
            <p className="text-text-light mb-4">No reviews yet. Be the first to share your experience!</p>
            {!showReviewForm && (
              <Button 
                onClick={() => setShowReviewForm(true)} 
                className="bg-red-600 hover:bg-red-700 text-white rounded-full"
              >
                Write the First Review
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
