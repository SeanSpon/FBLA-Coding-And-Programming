import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

type BotCheckProps = {
  onVerify: () => void;
  onCancel?: () => void;
};

/**
 * BotCheck component - Math CAPTCHA with rate limiting to prevent bot spam
 * 
 * SECURITY FEATURES:
 * - Generates random math problems (addition) to verify human input
 * - Enforces rate limiting: max 5 attempts per 60 seconds
 * - Blocks submissions if rate limit exceeded
 * - Input validation: only numeric answers accepted
 * - Clear error feedback on incorrect answers
 * 
 * FBLA COMPLIANCE:
 * - Prevents automated form submissions
 * - Demonstrates defensive programming (rate limiting)
 * - Professional error handling and user feedback
 */
export default function BotCheck({ onVerify, onCancel }: BotCheckProps) {
  const [num1] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const attemptTimestampsRef = useRef<number[]>([]);

  // Auto-focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Check if user has exceeded rate limit (5 attempts per 60 seconds)
   * This prevents brute force attacks and automated bot submissions
   */
  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const sixtySecondsAgo = now - 60000;
    
    // Remove timestamps older than 60 seconds
    attemptTimestampsRef.current = attemptTimestampsRef.current.filter(
      timestamp => timestamp > sixtySecondsAgo
    );

    // Check if at rate limit (5 attempts per 60 seconds)
    if (attemptTimestampsRef.current.length >= 5) {
      setRateLimited(true);
      setErrorMessage("Too many attempts. Please wait a moment before trying again.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input is not empty
    if (!answer.trim()) {
      setError(true);
      setErrorMessage("Please enter a number");
      return;
    }

    // Validate input is numeric
    const userAnswer = parseInt(answer, 10);
    if (isNaN(userAnswer)) {
      setError(true);
      setErrorMessage("Please enter a valid number");
      return;
    }

    // Check rate limit before processing
    if (!checkRateLimit()) {
      return;
    }

    // Record this attempt timestamp
    attemptTimestampsRef.current.push(Date.now());

    const correctAnswer = num1 + num2;

    // Validate answer
    if (userAnswer === correctAnswer) {
      setError(false);
      setErrorMessage("");
      setRateLimited(false);
      onVerify();
    } else {
      setError(true);
      setErrorMessage(`Incorrect answer. Please try again. (${attemptTimestampsRef.current.length}/5 attempts)`);
      setAnswer("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={handleKeyPress}>
      <div className="text-center">
        <div className="text-lg font-medium mb-2">
          Verify you're human
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Please solve this simple math problem to continue
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="math-answer" className="text-base">
          What is{" "}
          <span className="font-bold text-primary">
            {num1} + {num2}
          </span>
          ?
        </Label>
        <Input
          ref={inputRef}
          id="math-answer"
          type="number"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError(false);
          }}
          placeholder="Enter your answer"
          className={error ? "border-red-500" : ""}
          required
          autoComplete="off"
          disabled={rateLimited}
          aria-invalid={error}
          aria-describedby={error ? "error-message" : undefined}
        />
        {error && (
          <div 
            id="error-message"
            className="flex items-center gap-2 text-sm text-red-600"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={rateLimited}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit"
          disabled={rateLimited}
        >
          Verify
        </Button>
      </div>
    </form>
  );
}

