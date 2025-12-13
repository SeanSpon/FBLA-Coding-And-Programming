import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce function with TypeScript support
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
export function toQueryString(params: Record<string, any>): string {
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

export function fromQueryString(search: string): Record<string, any> {
  const params = new URLSearchParams(search);
  const result: Record<string, any> = {};
  
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
