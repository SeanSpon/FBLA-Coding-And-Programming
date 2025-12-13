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
 * BotCheck component - Simple math CAPTCHA to prevent spam
 */
export default function BotCheck({ onVerify, onCancel }: BotCheckProps) {
  const [num1] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(answer, 10);

    if (userAnswer === correctAnswer) {
      setError(false);
      onVerify();
    } else {
      setError(true);
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
        />
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Incorrect answer. Please try again.</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          Verify
        </Button>
      </div>
    </form>
  );
}

