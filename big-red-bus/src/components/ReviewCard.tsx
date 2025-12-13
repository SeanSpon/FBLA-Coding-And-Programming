import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "@/types/organization";

type ReviewCardProps = {
  review: Review;
};

// Star rating display
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="border-2 border-red-200 rounded-2xl hover:border-red-600 hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="space-y-3">
          {/* Header with stars and date */}
          <div className="flex items-center justify-between">
            <StarDisplay rating={review.rating} />
            <span className="text-sm text-text-light">
              {formatDate(review.date)}
            </span>
          </div>

          {/* Author */}
          <div className="font-semibold text-red-600">
            {review.author}
          </div>

          {/* Comment */}
          <p className="text-sm text-text-light leading-relaxed">
            {review.comment}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
