export function formatCityState(address?: string): string | undefined {
  if (!address) return undefined;
  const parts = address.split(',').map((s) => s.trim());
  if (parts.length >= 3) {
    const city = parts[1];
    const state = parts[2].split(' ')[0];
    if (city && state) return `${city}, ${state}`;
  }
  if (parts.length === 2) return parts[1];
  return undefined;
}

export function formatHours(hours?: unknown): { firstLine?: string; full?: string[] } {
  const arr = normalizeArray<string>(hours);
  if (arr.length === 0) return {};
  return { firstLine: arr[0], full: arr };
}

export function displayTypes(types?: string[]): string[] {
  if (!Array.isArray(types)) return [];
  const drop = new Set(['point_of_interest']);
  return types
    .filter((t) => t && !drop.has(t))
    .map((t) => t.replace(/_/g, ' '))
    .map((s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase()));
}

export function humanizeType(t?: string): string {
  if (!t) return '';
  if (t === 'point_of_interest') return '';
  const s = t.replace(/_/g, ' ');
  return s.replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

export function phoneHref(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d]/g, '');
  if (!digits) return undefined;
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return `tel:+${digits}`;
}

// Use Vite env if available, fallback for tests/runtime
export const API: string = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> })?.env?.VITE_API_URL) || "http://localhost:8080";

export function photoUrl(ref?: string, w = 640): string {
  return ref ? `${API}/photo?ref=${encodeURIComponent(ref)}&w=${w}` : '';
}

export function safeUrl(u?: string): string {
  if (!u) return '';
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export function cityStateFromAddress(addr?: string): string {
  if (!addr) return '';
  const parts = addr.split(',').map(s => s.trim());
  if (parts.length >= 3) return `${parts[1]}, ${parts[2].split(' ')[0]}`;
  return addr;
}

export function normalizeArray<T = string>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (typeof val === 'string' && val.trim()) {
    try { return JSON.parse(val) as T[]; } catch {
      // ignore invalid JSON
    }
  }
  return [];
}
