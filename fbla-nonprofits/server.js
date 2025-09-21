// npm i express sqlite3 cors csv-parse
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import { parse } from "csv-parse/sync";
import multer from "multer";

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const DB_PATH = "./nonprofits.db";
let db;

async function init() {
  db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec(`
    create table if not exists orgs (
      id integer primary key,
      name text not null,
      ein text,
      cause text,
      city text,
      state text,
      website text,
      phone text,
      rating real,
      needs text,
      lat real,
      lng real,
      last_verified text default (datetime('now'))
    );
    create index if not exists idx_state on orgs(state);
    create index if not exists idx_name on orgs(name);
    create index if not exists idx_cause on orgs(cause);
  `);

  // Seed from CSV on first run
  const { count } = await db.get(`select count(*) as count from orgs;`);
  if (count === 0 && fs.existsSync("./nonprofits.csv")) {
    const csv = fs.readFileSync("./nonprofits.csv", "utf8");
    const rows = parse(csv, { columns: true, skip_empty_lines: true });
    const stmt = await db.prepare(`
      insert into orgs(name,ein,cause,city,state,website,phone,rating,needs,lat,lng)
      values(?,?,?,?,?,?,?,?,?,?,?)
    `);
    for (const r of rows) {
      await stmt.run(
        r.name, r.ein, r.cause, r.city, r.state, r.website, r.phone,
        Number(r.rating || 0), r.needs, Number(r.lat || 0), Number(r.lng || 0)
      );
    }
    await stmt.finalize();
    console.log(`Seeded ${rows.length} nonprofits from CSV`);
  }
}
await init();

// GET /orgs?q=food&state=KY&minRating=4
app.get("/orgs", async (req, res) => {
  const { q = "", state = "", minRating = "0", limit = "50" } = req.query;
  const parts = [];
  const vals = [];

  if (state) { parts.push("state = ?"); vals.push(state); }
  if (minRating) { parts.push("rating >= ?"); vals.push(Number(minRating)); }

  if (q) {
    parts.push("(lower(name) like ? or lower(cause) like ? or lower(needs) like ?)");
    const s = `%${String(q).toLowerCase()}%`;
    vals.push(s, s, s);
  }

  const where = parts.length ? `where ${parts.join(" and ")}` : "";
  const data = await db.all(`select * from orgs ${where} limit ?`, ...vals, Number(limit));
  res.json(data);
});

// Simple nearby search: /near?lat=38.25&lng=-85.76&radiusKm=25
app.get("/near", async (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radiusKm = Number(req.query.radiusKm || 25);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return res.status(400).json({ error: "lat,lng required" });

  const R = 6371; // km
  const data = await db.all(`select * from orgs where lat != 0 and lng != 0`);
  const withDist = data.map(o => {
    const dLat = (o.lat - lat) * Math.PI/180;
    const dLng = (o.lng - lng) * Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat*Math.PI/180)*Math.cos(o.lat*Math.PI/180)*Math.sin(dLng/2)**2;
    const d = 2 * R * Math.asin(Math.sqrt(a));
    return { ...o, distance_km: d };
  }).filter(o => o.distance_km <= radiusKm)
    .sort((a,b)=>a.distance_km - b.distance_km)
    .slice(0, 50);

  res.json(withDist);
});

// Admin CSV import: POST /admin/import-csv with multipart form field name "file"
app.post("/admin/import-csv", upload.single("file"), async (req, res) => {
  try {
    if (!req.file?.path) return res.status(400).json({ error: "file required" });
    const csv = fs.readFileSync(req.file.path, "utf8");
    const rows = parse(csv, { columns: true, skip_empty_lines: true });

    await db.exec("delete from orgs;");
    const stmt = await db.prepare(`
      insert into orgs(name,ein,cause,city,state,website,phone,rating,needs,lat,lng)
      values(?,?,?,?,?,?,?,?,?,?,?)
    `);
    for (const r of rows) {
      await stmt.run(
        r.name, r.ein, r.cause, r.city, r.state, r.website, r.phone,
        Number(r.rating || 0), r.needs, Number(r.lat || 0), Number(r.lng || 0)
      );
    }
    await stmt.finalize();
    fs.unlinkSync(req.file.path);
    res.json({ ok: true, imported: rows.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
