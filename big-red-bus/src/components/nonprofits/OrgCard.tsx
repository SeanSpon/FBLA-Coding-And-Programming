import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Tag, Star, Phone, Globe } from "lucide-react";
import type { Organization } from "@/types/organization";
import { useFavorites } from "@/hooks/useFavorites";

type OrgCardProps = {
  org: Organization;
};

// Star rating component
function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <span className="text-xs text-text-light">({reviewCount})</span>
    </div>
  );
}

// Category icon mapper
function getCategoryIcon(category: string) {
  if (category.includes("Food")) return "🍽️";
  if (category.includes("Mental Health") || category.includes("Health")) return "🏥";
  if (category.includes("Education")) return "📚";
  if (category.includes("Community")) return "🏘️";
  if (category.includes("Business")) return "🏪";
  return "❤️";
}

// Category color - red/white theme
const categoryColor = "bg-red-50 text-red-700 border border-red-200";

export default function OrgCard({ org }: OrgCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(org.id);
  const cityState = `${org.city}, ${org.state}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(org.id);
  };

  return (
    <Card className="h-full border-2 border-red-200 hover:border-red-600 hover:shadow-xl transition-all rounded-2xl">
      <CardContent className="p-0">
        {/* Icon header */}
        <div className="relative h-40 w-full bg-gradient-to-br from-red-50 to-white flex items-center justify-center overflow-hidden rounded-t-2xl border-b-2 border-red-200">
          <div className="text-7xl opacity-80">
            {getCategoryIcon(org.category)}
          </div>
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white shadow-md transition-all hover:scale-110 active:scale-95 border-2 border-red-200"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favorited ? "fill-red-600 text-red-600" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-3">
          {/* Header with name and rating */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading font-bold text-lg leading-tight flex-1 line-clamp-2">
              {org.name}
            </h3>
            <StarRating rating={org.rating} reviewCount={org.reviewCount} />
          </div>

          {/* Location */}
          <div className="text-sm text-text-light flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{cityState}</span>
          </div>

          {/* Category */}
          <Badge className={`w-fit ${categoryColor}`}>
            {org.category}
          </Badge>

          {/* Deals badge */}
          {org.deals && org.deals.length > 0 && (
            <Badge className="w-fit gap-1.5 bg-red-600 hover:bg-red-700 text-white border-0 rounded-full">
              <Tag className="h-3.5 w-3.5" />
              {org.deals.length} {org.deals.length === 1 ? 'Deal' : 'Deals'} Available
            </Badge>
          )}

          {/* About snippet */}
          <p className="text-sm text-text-light line-clamp-3 min-h-[3.75rem]">
            {org.description}
          </p>

          {/* Contact info preview */}
          <div className="flex gap-3 text-xs text-text-light">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-red-600" />
              <span className="truncate">{org.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-red-600" />
              <span className="truncate">{org.website}</span>
            </div>
          </div>

          {/* Action button */}
          <Link to={`/directory/${org.id}`} className="mt-2">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full">
              View Details →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
