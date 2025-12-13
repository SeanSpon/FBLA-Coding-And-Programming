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
  Heart
} from "lucide-react";
import organizationsData from "@/data/organizations.json";
import type { Organization } from "@/types/organization";
import { useFavorites } from "@/hooks/useFavorites";
import { useReviews } from "@/hooks/useReviews";
import { useState } from "react";

const organizations = organizationsData as Organization[];

export default function NonprofitDetail() {
  const { id } = useParams<{ id: string }>();
  const organization = organizations.find(org => org.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { reviews, addReview, getAverageRating } = useReviews(id);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!organization) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2">Organization Not Found</h2>
        <p className="text-text-light mb-6">
          The organization you're looking for doesn't exist.
        </p>
        <Link to="/directory">
          <Button>Back to Directory</Button>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(organization.id);
  const userReviews = reviews;
  const displayedReviews = showAllReviews ? userReviews : userReviews.slice(0, 3);
  
  // Combine organization rating with user reviews for display
  const averageUserRating = getAverageRating(organization.id);
  const displayRating = userReviews.length > 0 ? averageUserRating : organization.rating;
  const totalReviewCount = organization.reviewCount + userReviews.length;

  // Category icon
  const getCategoryIcon = (category: string) => {
    if (category.includes("Food")) return "🍽️";
    if (category.includes("Mental Health") || category.includes("Health")) return "🏥";
    if (category.includes("Education")) return "📚";
    if (category.includes("Community")) return "🏘️";
    if (category.includes("Business")) return "🏪";
    return "❤️";
  };

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
            <div className="text-6xl">{getCategoryIcon(organization.category)}</div>
            <div className="space-y-3 flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-red-600">
                {organization.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{displayRating.toFixed(1)}</span>
                  <span className="text-text-light">({totalReviewCount} reviews)</span>
                </div>
                <Badge className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-full">{organization.category}</Badge>
              </div>
              <div className="flex items-center gap-2 text-text-light">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>{organization.city}, {organization.state}</span>
              </div>
            </div>
          </div>
          
          {/* Favorite Button */}
          <Button
            size="lg"
            variant={favorited ? "default" : "outline"}
            onClick={() => toggleFavorite(organization.id)}
            className={`gap-2 rounded-full ${favorited ? "bg-red-600 hover:bg-red-700 text-white" : "border-2 border-red-600 text-red-600 hover:bg-red-50"}`}
          >
            <Heart className={`h-5 w-5 ${favorited ? "fill-current" : ""}`} />
            {favorited ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* About Section */}
      <section>
        <h2 className="text-2xl font-heading font-bold mb-4 text-red-600">About</h2>
        <p className="text-text-light leading-relaxed">
          {organization.fullDescription}
        </p>
      </section>

      {/* Contact Info */}
      <section className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-6 border-2 border-red-200 shadow-lg">
        <h2 className="text-2xl font-heading font-bold mb-4 text-red-600">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-text-light">Phone</div>
              <a href={`tel:${organization.phone}`} className="font-medium hover:text-red-600 transition-colors">
                {organization.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-text-light">Website</div>
              <a 
                href={`https://${organization.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-red-600 transition-colors"
              >
                {organization.website}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-sm text-text-light">Address</div>
              <p className="font-medium">{organization.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      {organization.deals && organization.deals.length > 0 && (
        <section>
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-red-600">
            💰 Exclusive Deals
            <Badge className="bg-red-600 text-white border-0 rounded-full">{organization.deals.length}</Badge>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {organization.deals.map((deal) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                organizationId={organization.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2 text-red-600">
            ⭐ Community Reviews
            <span className="text-lg text-text-light font-normal">
              ({displayRating.toFixed(1)} avg • {totalReviewCount} reviews)
            </span>
          </h2>
          {!showReviewForm && (
            <Button onClick={() => setShowReviewForm(true)} className="bg-red-600 hover:bg-red-700 text-white rounded-full">
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
        {displayedReviews.length > 0 ? (
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
            <div className="text-4xl mb-3">💬</div>
            <p className="text-text-light mb-4">No reviews yet. Be the first to share your experience!</p>
            {!showReviewForm && (
              <Button onClick={() => setShowReviewForm(true)} className="bg-red-600 hover:bg-red-700 text-white rounded-full">
                Write the First Review
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
