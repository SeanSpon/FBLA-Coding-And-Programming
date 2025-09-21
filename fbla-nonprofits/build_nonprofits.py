#!/usr/bin/env python3
"""
Builds your FBLA nonprofits.csv from a rough CSV.
- Flexible column names (it guesses/matches).
- Normalizes phone/website/EIN.
- Infers 'needs' from mission text.
- Seeds a simple 'rating'.
- Optional geocoding via Nominatim (polite rate-limit + caching).
Usage:
  python build_nonprofits.py --in raw.csv --out nonprofits.csv [--geocode]
"""

import csv, re, argparse, time, json, os, sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("pip install requests")
    sys.exit(1)

RE_PHONE = re.compile(r"\D+")
RE_EIN = re.compile(r"(\d{2})[- ]?(\d{7})")
USER_AGENT = "fbla-nonprofits/1.0 (contact@example.com)"

# Target headers for your API
TARGET_HEADERS = [
    "name","ein","cause","city","state","website","phone","rating","needs","lat","lng"
]

# Possible input header aliases -> canonical
ALIASES = {
    "name": ["name","organization","org","org_name","business","nonprofit"],
    "ein": ["ein","tax_id","taxid","employer_identification_number"],
    "cause": ["cause","mission","description","about","focus"],
    "city": ["city","town"],
    "state": ["state","st","province"],
    "website": ["website","url","site","web","homepage"],
    "phone": ["phone","phone_number","tel","telephone","contact"],
    "address": ["address","addr","street","location","full_address"],
    "lat": ["lat","latitude"],
    "lng": ["lng","long","lon","longitude"],
    "needs": ["needs","what_we_need","volunteer_need","donations_need"],
    "rating": ["rating","score"]
}

def find_col(header_row, candidates):
    header_lc = [h.strip().lower() for h in header_row]
    for cand in candidates:
        if cand in header_lc:
            return header_lc.index(cand)
    return None

def map_columns(header_row):
    """Return dict: canonical_key -> column index (or None)."""
    mapping = {}
    for key, alias_list in ALIASES.items():
        idx = find_col(header_row, [a.lower() for a in alias_list])
        mapping[key] = idx
    return mapping

def clean_str(x):
    return (x or "").strip()

def normalize_phone(s):
    s = clean_str(s)
    if not s: return ""
    digits = RE_PHONE.sub("", s)
    if len(digits) == 10:
        return f"{digits[0:3]}-{digits[3:6]}-{digits[6:10]}"
    return s  # leave as-is if not 10 digits

def normalize_ein(s):
    s = clean_str(s)
    if not s: return ""
    m = RE_EIN.search(s)
    if not m: return s
    return f"{m.group(1)}-{m.group(2)}"

def normalize_website(s):
    s = clean_str(s)
    if not s: return ""
    if s.startswith("http://") or s.startswith("https://"):
        return s
    return "https://" + s

def infer_needs(cause):
    s = (cause or "").lower()
    if "volunteer" in s: return "Volunteers needed"
    if "donation" in s or "donate" in s: return "Donations requested"
    if "drive" in s and ("food" in s or "clothes" in s):
        return "Item drive"
    return ""

def seed_rating(website, cause):
    r = 3.8
    if website: r += 0.3
    if cause and len(cause) > 60: r += 0.2
    return min(5.0, r)

def geocode_address(addr, city, state, cache, enable=False):
    if not enable:
        return "", ""
    full = ", ".join([p for p in [addr, city, state, "USA"] if p])
    if not full: return "", ""
    if full in cache:
        lat, lng = cache[full]
        return lat, lng
    url = "https://nominatim.openstreetmap.org/search"
    params = {"q": full, "format": "json", "limit": 1}
    try:
        resp = requests.get(url, params=params, headers={"User-Agent": USER_AGENT}, timeout=20)
        data = resp.json()
        if data:
            lat, lng = data[0]["lat"], data[0]["lon"]
            cache[full] = (lat, lng)
            time.sleep(1.1)  # be polite
            return lat, lng
    except Exception:
        pass
    return "", ""

def build(args):
    in_path = Path(args.infile)
    out_path = Path(args.outfile)
    cache_path = Path("geocode_cache.json")

    if not in_path.exists():
        print(f"Input file not found: {in_path}")
        sys.exit(1)

    # Load geocode cache if exists
    cache = {}
    if cache_path.exists():
        try:
            cache = json.loads(cache_path.read_text(encoding="utf-8"))
        except Exception:
            cache = {}

    with in_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        try:
            header = next(reader)
        except StopIteration:
            print("Empty input.")
            sys.exit(1)
        mapping = map_columns(header)

        rows_out = []

        for row in reader:
            # pull fields (tolerant to missing columns)
            def get(map_key):
                idx = mapping.get(map_key)
                return clean_str(row[idx]) if idx is not None and idx < len(row) else ""

            name = get("name")
            if not name:
                # skip rows without a name
                continue

            ein = normalize_ein(get("ein"))
            cause = get("cause")
            city = get("city")
            state = get("state")[:2].upper() if get("state") else ""
            website = normalize_website(get("website")) if get("website") else ""
            phone = normalize_phone(get("phone"))
            rating = get("rating")
            needs = get("needs")
            lat = get("lat")
            lng = get("lng")

            # if no needs, infer from cause/mission
            if not needs:
                needs = infer_needs(cause)

            # if no rating, seed a reasonable one
            try:
                rating_val = float(rating) if rating else seed_rating(website, cause)
            except ValueError:
                rating_val = seed_rating(website, cause)

            # geocode if missing lat/lng and geocode enabled
            addr = get("address")
            if (not lat or not lng) and (addr or (city and state)):
                glat, glng = geocode_address(addr, city, state, cache, enable=args.geocode)
                lat = lat or glat
                lng = lng or glng

            rows_out.append({
                "name": name,
                "ein": ein,
                "cause": cause,
                "city": city,
                "state": state,
                "website": website,
                "phone": phone,
                "rating": f"{rating_val:.1f}",
                "needs": needs,
                "lat": lat,
                "lng": lng,
            })

    # write cache
    try:
        cache_path.write_text(json.dumps(cache, indent=2), encoding="utf-8")
    except Exception:
        pass

    # write output
    with out_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=TARGET_HEADERS)
        writer.writeheader()
        writer.writerows(rows_out)

    print(f"✅ Wrote {len(rows_out)} rows → {out_path}")

def main():
    p = argparse.ArgumentParser(description="Normalize raw nonprofit CSV to nonprofits.csv")
    p.add_argument("--in", dest="infile", required=True, help="Path to raw CSV input")
    p.add_argument("--out", dest="outfile", required=True, help="Path to output nonprofits.csv")
    p.add_argument("--geocode", action="store_true", help="Enable Nominatim geocoding (rate-limited + cached)")
    args = p.parse_args()
    build(args)

if __name__ == "__main__":
    main()
