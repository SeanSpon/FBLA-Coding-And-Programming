import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce function with TypeScript support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generic pagination utility
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

// Sort organizations by different keys
export function sortOrgs<T extends { name: string; rating?: number; city?: string }>(
  rows: T[],
  sortKey: "name-asc" | "rating-desc" | "city-asc"
): T[] {
  return [...rows].sort((a, b) => {
    switch (sortKey) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "rating-desc":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "city-asc":
        return (a.city ?? "").localeCompare(b.city ?? "");
      default:
        return 0;
    }
  });
}

// Query string utilities
export function toQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)) {
      if (Array.isArray(value)) {
        searchParams.set(key, value.join(","));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  return searchParams.toString();
}

export function fromQueryString(search: string): Record<string, unknown> {
  const params = new URLSearchParams(search);
  const result: Record<string, unknown> = {};
  
  params.forEach((value, key) => {
    if (value.includes(",")) {
      result[key] = value.split(",").filter(Boolean);
    } else if (value === "true" || value === "false") {
      result[key] = value === "true";
    } else if (!isNaN(Number(value)) && value !== "") {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  });
  
  return result;
}

/**
 * SECURITY: Sanitize user input to prevent XSS attacks
 * 
 * Removes HTML/script tags and dangerous attributes
 * Safe for rendering in React components (already uses text content)
 * 
 * @param input - Raw user input string
 * @returns Sanitized string safe for display
 * 
 * EXAMPLES OF BLOCKED INPUTS:
 * - "<script>alert('xss')</script>" → ""
 * - "<img src=x onerror=alert('xss')>" → ""
 * - "Normal text <b onclick='alert()'>here</b>" → "Normal text here"
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Strip HTML tags and decode HTML entities safely
  const temp = document.createElement('div');
  temp.innerHTML = input;
  const textContent = temp.textContent || temp.innerText || '';
  
  // Remove any remaining suspicious patterns and protocols
  return textContent
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '')       // Remove data: protocol
    .replace(/vbscript:/gi, '')   // Remove vbscript: protocol
    .trim();
}

/**
 * SECURITY: Validate review text
 * 
 * Ensures review meets length requirements and contains valid content
 * 
 * @param text - Review text to validate
 * @param minLength - Minimum allowed length (default: 10)
 * @param maxLength - Maximum allowed length (default: 5000)
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateReviewText(
  text: string,
  minLength: number = 10,
  maxLength: number = 5000
): { isValid: boolean; error?: string } {
  if (!text || typeof text !== 'string') {
    return { isValid: false, error: 'Review text is required' };
  }

  const trimmed = text.trim();

  if (trimmed.length < minLength) {
    return { 
      isValid: false, 
      error: `Review must be at least ${minLength} characters long` 
    };
  }

  if (trimmed.length > maxLength) {
    return { 
      isValid: false, 
      error: `Review cannot exceed ${maxLength} characters` 
    };
  }

  // Check for excessive whitespace (spam indicator)
  if (trimmed.split(/\s+/).length === 1 && trimmed.length > 50) {
    return { 
      isValid: false, 
      error: 'Please write a meaningful review with multiple words' 
    };
  }

  return { isValid: true };
}

/**
 * SECURITY: Validate author name
 * 
 * Ensures author name meets requirements and doesn't contain malicious input
 * 
 * @param name - Author name to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateAuthorName(name: string): { isValid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Author name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { isValid: false, error: 'Name cannot exceed 100 characters' };
  }

  // Only allow alphanumeric, spaces, hyphens, apostrophes
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }

  return { isValid: true };
}

/**
 * SECURITY: Validate rating value
 * 
 * Ensures rating is within valid range (1-5 stars)
 * 
 * @param rating - Rating value to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateRating(rating: unknown): { isValid: boolean; error?: string } {
  const num = Number(rating);

  if (isNaN(num)) {
    return { isValid: false, error: 'Rating must be a number' };
  }

  if (num < 1 || num > 5) {
    return { isValid: false, error: 'Rating must be between 1 and 5' };
  }

  if (!Number.isInteger(num)) {
    return { isValid: false, error: 'Rating must be a whole number' };
  }

  return { isValid: true };
}
