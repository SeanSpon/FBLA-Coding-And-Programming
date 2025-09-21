// scrape_cfl.js — CFL Find-a-Nonprofit targeted scraper
// npm i puppeteer csv-writer
import puppeteer from "puppeteer";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";

const BASE = "https://www.cflouisville.org/find-a-nonprofit/";
const MAX_PROFILES = 250; // safety cap so you don't go infinite
const DELAY_MS = () => 600 + Math.floor(Math.random() * 500); // polite delay

const out = createObjectCsvWriter({
  path: "scraped_nonprofits.csv",
  header: [
    { id: "name",       title: "name" },
    { id: "ein",        title: "ein" },
    { id: "mission",    title: "mission" },
    { id: "address",    title: "address" },
    { id: "city",       title: "city" },
    { id: "state",      title: "state" },
    { id: "website",    title: "website" },
    { id: "phone",      title: "phone" },
    { id: "notes",      title: "notes" },
    { id: "profileUrl", title: "profileUrl" }
  ]
});

function clean(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function parseCityState(addr) {
  if (!addr) return { city: "", state: "" };
  const m =
    addr.match(/([^,]+),\s*([A-Z]{2})(?:\s*\d{5})?/) ||
    addr.match(/([A-Za-z.\- ]+),\s*([A-Z]{2})/);
  return m ? { city: clean(m[1]), state: clean(m[2]) } : { city: "", state: "" };
}
function externalWebsiteHref() {
  const anchors = Array.from(document.querySelectorAll("a[href^='http']"));
  const thisHost = location.hostname.replace(/^www\./, "");
  for (const a of anchors) {
    try {
      const host = new URL(a.href).hostname.replace(/^www\./, "");
      if (
        host !== thisHost &&
        !/facebook|instagram|twitter|x\.com|youtube|linkedin/.test(host)
      ) return a.href;
    } catch {}
  }
  return "";
}

async function getAllProfileLinks(page) {
  // grab links on the main page
  const rootLinks = await page.evaluate(() => {
    const hrefs = new Set();
    for (const a of document.querySelectorAll("a")) {
      const href = a.href || "";
      if (!href) continue;
      if (
        /guidestar|candid/.test(href) ||
        /\/organization\//i.test(href) ||
        /nonprofit|charity|profile/i.test(href)
      ) hrefs.add(href);
    }
    return [...hrefs];
  });

  // dive into iframes (Candid often loads in an iframe)
  const frameLinks = [];
  for (const f of page.frames()) {
    try {
      const links = await f.$$eval("a", as =>
        as.map(a => a.href).filter(Boolean)
      );
      for (const href of links) {
        if (
          /guidestar|candid/.test(href) ||
          /\/organization\//i.test(href) ||
          /nonprofit|charity|profile/i.test(href)
        ) frameLinks.push(href);
      }
    } catch {}
  }

  const all = [...rootLinks, ...frameLinks];

  // normalize + dedupe
  const dedup = [...new Set(all)]
    .filter(u => !u.includes("#"))
    .slice(0, MAX_PROFILES * 3); // rough cap
  return dedup;
}

async function extractProfile(page, url) {
  await page.goto(url, { waitUntil: "networkidle2" });
  await sleep(800);

  // try several common structures (Candid/GuideStar and typical org pages)
  const data = await page.evaluate(() => {
    const pickText = sel => {
      const el = document.querySelector(sel);
      return el ? el.textContent.trim() : "";
    };
    function externalWebsiteHref() {
      const anchors = Array.from(document.querySelectorAll("a[href^='http']"));
      const thisHost = location.hostname.replace(/^www\./, "");
      for (const a of anchors) {
        try {
          const host = new URL(a.href).hostname.replace(/^www\./, "");
          if (
            host !== thisHost &&
            !/facebook|instagram|twitter|x\.com|youtube|linkedin/.test(host)
          ) return a.href;
        } catch {}
      }
      return "";
    }

    // name candidates
    const name =
      pickText("h1") ||
      pickText(".org-name, .organization-name, .profile__title, .page-title") ||
      document.title;

    // mission/summary candidates
    const mission =
      pickText(".mission, .org-mission, .mission-statement, .profile__description, .profile-description, .summary") ||
      pickText('[data-testid="mission"]') ||
      pickText('[itemprop="description"]') ||
      "";

    // address candidates
    const addr =
      pickText("address") ||
      pickText(".address, .org-address, .location, [itemprop='address']") || "";

    // phone candidates
    const tel =
      (document.querySelector("a[href^='tel:']")?.textContent || "").trim() ||
      pickText(".phone, .org-phone") ||
      "";

    // website: any external site that isn't the host or socials
    const website = (()=>{
      const w = externalWebsiteHref();
      if (w) return w;
      // sometimes buttons labelled "Website"
      const btn = Array.from(document.querySelectorAll("a,button"))
        .find(el => /website/i.test(el.textContent || ""));
      return btn?.href || "";
    })();

    // EIN anywhere on page text
    const body = document.body.innerText;
    const einMatch =
      body.match(/\bEIN[:\s]*([0-9\-]{2,15})\b/i) ||
      body.match(/\bEmployer Identification Number[:\s]*([0-9\-]{2,15})\b/i);

    return {
      name,
      mission,
      address: addr,
      phone: tel,
      website,
      ein: einMatch ? einMatch[1] : "",
      profileUrl: location.href
    };
  });

  // strip junk + split city/state
  const name = clean(data.name);
  const mission = clean(data.mission);
  const address = clean(data.address);
  const phone = clean(data.phone);
  const website = clean(data.website);
  const ein = clean(data.ein);
  const { city, state } = parseCityState(address);

  return {
    name, ein, mission, address, city, state, website, phone,
    notes: "",
    profileUrl: url
  };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  console.log("Opening directory…", BASE);
  await page.goto(BASE, { waitUntil: "networkidle2" });

  // try to trigger lazy content
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1200));
  }

  // try load-more buttons a few times
  for (let i = 0; i < 8; i++) {
    const clicked = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button, a")]
        .find(b => /load more|more results|next/i.test(b.textContent || ""));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await new Promise(r => setTimeout(r, 1500));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // small settle wait
  await new Promise(r => setTimeout(r, 1500));

  const candidates = await getAllProfileLinks(page);
  console.log(`Found ${candidates.length} candidate links`);

  const prioritized = [
    ...candidates.filter(u => /guidestar|candid/.test(u)),
    ...candidates.filter(u => /\/organization\//i.test(u)),
    ...candidates.filter(u => !/guidestar|candid|\/organization\//i.test(u)),
  ].slice(0, MAX_PROFILES);

  const results = [];
  const detailPage = await browser.newPage();
  detailPage.setDefaultNavigationTimeout(60000);

  for (let i = 0; i < prioritized.length; i++) {
    const url = prioritized[i];
    try {
      console.log(`[${i + 1}/${prioritized.length}] ${url}`);
      const row = await extractProfile(detailPage, url);
      if (row.name && (row.website || row.address)) {
        results.push(row);
      } else {
        console.log("  skipped (missing essentials)");
      }
      await new Promise(r => setTimeout(r, DELAY_MS()));
    } catch (e) {
      console.log("  error:", e.message);
    }
  }

  const deduped = [];
  const seen = new Set();
  for (const r of results) {
    const key =
      (r.website && r.website.toLowerCase()) ||
      `${r.name.toLowerCase()}|${(r.city || "").toLowerCase()}`;
    if (!seen.has(key)) { deduped.push(r); seen.add(key); }
  }

  console.log(`Saving ${deduped.length} rows → scraped_nonprofits.csv`);
  if (fs.existsSync("scraped_nonprofits.csv")) fs.unlinkSync("scraped_nonprofits.csv");
  await out.writeRecords(deduped);

  await browser.close();
  console.log("Done.");
})().catch(e => {
  console.error(e);
  process.exit(1);
});
