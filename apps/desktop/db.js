import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

let db

export async function initDb() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  const dbPath = path.join(dataDir, 'app.db')
  db = new Database(dbPath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      notes TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `)
}

export function listItems() {
  return db.prepare(`SELECT id, title, notes, created_at as createdAt, updated_at as updatedAt FROM items ORDER BY created_at DESC`).all()
}

export function addItem({ id, title, notes, createdAt, updatedAt }) {
  const stmt = db.prepare(`INSERT INTO items (id, title, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`)
  stmt.run(id, title, notes ?? null, createdAt, updatedAt)
  return { ok: true }
}

export function deleteItem(id) {
  db.prepare(`DELETE FROM items WHERE id = ?`).run(id)
  return { ok: true }
}
