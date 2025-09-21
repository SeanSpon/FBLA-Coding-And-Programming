// normalize.js — rewrite scraped_nonprofits.csv -> nonprofits.csv
import fs from "fs";
import { parse } from "csv-parse/sync";
import { createObjectCsvWriter } from "csv-writer";

// ------- Helpers -------
function inferNeeds(mission = "") {
  const s = mission.toLowerCase();
  if (s.includes("volunteer")) return "Volunteers needed";
  if (s.includes("donation") || s.includes("donate")) return "Donations requested";
  if (s.includes("drive") && (s.includes("food") || s.includes("clothes"))) return "Item drive";
  return "";
}
function seedRating({ website, mission }) {
  let r = 3.8;
  if (website) r += 0.3;
  if (mission && mission.length > 60) r += 0.2;
  return Math.min(5, r);
}

// OPTIONAL geocode (comment out to stay fully offline)
const CACHE_PATH = "geocode_cache.json";
let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8")); } catch {}
async function geocode(addr) {
  if (!addr) return { lat: "", lng: "" };
  if (cache[addr]) return cache[addr];
  const q = encodeURIComponent(addr + ", Louisville KY");
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "fbla-nonprofits/1.0 (contact@example.com)" }
  });
  const arr = await res.json();
  const out = (arr && arr[0]) ? { lat: arr[0].lat, lng: arr[0].lon } : { lat: "", lng: "" };
  cache[addr] = out;
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  await new Promise(r => setTimeout(r, 1100)); // be polite
  return out;
}

// ------- Run -------
const raw = fs.readFileSync("scraped_nonprofits.csv", "utf8");
const rows = parse(raw, { columns: true, skip_empty_lines: true });

const writer = createObjectCsvWriter({
  path: "nonprofits.csv",
  header: [
    {id:"name", title:"name"},
    {id:"ein", title:"ein"},
    {id:"cause", title:"cause"},
    {id:"city", title:"city"},
    {id:"state", title:"state"},
    {id:"website", title:"website"},
    {id:"phone", title:"phone"},
    {id:"rating", title:"rating"},
    {id:"needs", title:"needs"},
    {id:"lat", title:"lat"},
    {id:"lng", title:"lng"}
  ]
});

const out = [];
for (const r of rows) {
  const cause = (r.mission || "").trim();
  const needs = inferNeeds(cause);
  const rating = seedRating({ website: r.website, mission: cause });
  let lat = "", lng = "";

  // Geocode if missing (uses Nominatim; cached in geocode_cache.json)
  const query = (r.address && r.address.trim()) || [r.city, r.state].filter(Boolean).join(", ");
  const g = await geocode(query);
  lat = g.lat; lng = g.lng;

  out.push({
    name: r.name || r.profileUrl || "",
    ein: r.ein || "",
    cause,
    city: r.city || "",
    state: r.state || "",
    website: r.website || "",
    phone: r.phone || "",
    rating,
    needs,
    lat, lng
  });
}

await writer.writeRecords(out);
console.log("Wrote nonprofits.csv with", out.length, "rows");
