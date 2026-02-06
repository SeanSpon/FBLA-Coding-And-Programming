import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, AlertCircle } from "lucide-react";
import type { Review } from "@/types/organization";
import BotCheckDialog from "./BotCheckDialog";
import { 
  sanitizeInput, 
  validateReviewText, 
  validateAuthorName, 
  validateRating 
} from "@/lib/utils";

type ReviewFormProps = {
  organizationId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
  onCancel?: () => void;
};

/**
 * ReviewForm component - Secure form for submitting organization reviews
 * 
 * SECURITY FEATURES:
 * - Input sanitization prevents XSS attacks
 * - Validates all inputs (name, rating, comment) before submission
 * - Enforces length limits on text fields
 * - Bot verification required before submission
 * - Clear error messages for validation failures
 * 
 * FBLA COMPLIANCE:
 * - Defensive programming (validation on all inputs)
 * - Professional error handling with user feedback
 * - Prevents malicious input injection
 */
export default function ReviewForm({ organizationId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [showBotCheck, setShowBotCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Error state for each field
  const [errors, setErrors] = useState<{
    author?: string;
    rating?: string;
    comment?: string;
  }>({});

  /**
   * Validate all form inputs before showing bot check
   * Returns true if all validations pass
   */
  const validateAllInputs = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate author name
    const authorValidation = validateAuthorName(author);
    if (!authorValidation.isValid) {
      newErrors.author = authorValidation.error;
    }

    // Validate rating
    const ratingValidation = validateRating(rating);
    if (!ratingValidation.isValid) {
      newErrors.rating = ratingValidation.error;
    }

    // Validate review text
    const commentValidation = validateReviewText(comment, 10, 5000);
    if (!commentValidation.isValid) {
      newErrors.comment = commentValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all inputs
    if (!validateAllInputs()) {
      return;
    }

    // Show bot verification dialog
    setShowBotCheck(true);
  };

  const handleBotVerified = () => {
    setIsSubmitting(true);
    
    // Sanitize inputs before submission
    const sanitizedComment = sanitizeInput(comment.trim());
    const sanitizedAuthor = sanitizeInput(author.trim());

    // Add review
    onSubmit({
      organizationId,
      rating,
      comment: sanitizedComment,
      author: sanitizedAuthor,
    });

    // Reset form
    setRating(5);
    setComment("");
    setAuthor("");
    setErrors({});
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
                onChange={(e) => {
                  setAuthor(e.target.value);
                  if (errors.author) {
                    setErrors({ ...errors, author: undefined });
                  }
                }}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
                className={`border-2 ${errors.author ? 'border-red-500' : 'border-red-200'} focus:border-red-600`}
                aria-invalid={!!errors.author}
                aria-describedby={errors.author ? "author-error" : undefined}
              />
              {errors.author && (
                <div id="author-error" className="flex items-center gap-2 text-sm text-red-600" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.author}</span>
                </div>
              )}
            </div>

            {/* Star rating */}
            <div className="space-y-2">
              <Label className="text-red-600">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      if (errors.rating) {
                        setErrors({ ...errors, rating: undefined });
                      }
                    }}
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
              {errors.rating && (
                <div className="flex items-center gap-2 text-sm text-red-600" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.rating}</span>
                </div>
              )}
            </div>

            {/* Comment field */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-red-600">Your Review</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (errors.comment) {
                    setErrors({ ...errors, comment: undefined });
                  }
                }}
                placeholder="Share your experience... (minimum 10 characters)"
                rows={4}
                required
                disabled={isSubmitting}
                minLength={10}
                maxLength={5000}
                className={`border-2 ${errors.comment ? 'border-red-500' : 'border-red-200'} focus:border-red-600`}
                aria-invalid={!!errors.comment}
                aria-describedby={errors.comment ? "comment-error" : undefined}
              />
              <div className="flex justify-between items-start">
                <p className="text-xs text-muted-foreground">
                  {comment.length} / 5000 characters
                </p>
                {errors.comment && (
                  <div id="comment-error" className="flex items-center gap-2 text-xs text-red-600" role="alert">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.comment}</span>
                  </div>
                )}
              </div>
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

