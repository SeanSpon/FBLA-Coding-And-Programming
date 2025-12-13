import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import type { Review } from "@/types/organization";
import BotCheckDialog from "./BotCheckDialog";

type ReviewFormProps = {
  organizationId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
  onCancel?: () => void;
};

/**
 * ReviewForm component - allows users to submit reviews with bot verification
 */
export default function ReviewForm({ organizationId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [showBotCheck, setShowBotCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!comment.trim() || !author.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (comment.trim().length < 10) {
      alert("Review must be at least 10 characters long");
      return;
    }

    // Show bot verification dialog
    setShowBotCheck(true);
  };

  const handleBotVerified = () => {
    setIsSubmitting(true);
    
    // Add review
    onSubmit({
      organizationId,
      rating,
      comment: comment.trim(),
      author: author.trim(),
    });

    // Reset form
    setRating(5);
    setComment("");
    setAuthor("");
    setIsSubmitting(false);
    setShowBotCheck(false);
  };

  return (
    <>
      <Card className="border-2 border-red-200 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600">Leave a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-red-600">Your Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
                className="border-2 border-red-200 focus:border-red-600"
              />
            </div>

            {/* Star rating */}
            <div className="space-y-2">
              <Label className="text-red-600">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                    disabled={isSubmitting}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Comment field */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-red-600">Your Review</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience... (minimum 10 characters)"
                rows={4}
                required
                disabled={isSubmitting}
                minLength={10}
                className="border-2 border-red-200 focus:border-red-600"
              />
              <p className="text-xs text-muted-foreground">
                {comment.length} / 500 characters
              </p>
            </div>

            {/* Submit buttons */}
            <div className="flex gap-2">
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-full"
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full" 
                disabled={isSubmitting}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Bot verification dialog */}
      <BotCheckDialog
        open={showBotCheck}
        onOpenChange={setShowBotCheck}
        onVerified={handleBotVerified}
        title="Verify to Submit Review"
        description="Please verify you're human to submit your review."
      />
    </>
  );
}

