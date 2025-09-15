import type { Item } from './types'
const KEY = 'fbla_items_v1'

export function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Item[]) : []
  } catch { return [] }
}

export function saveItems(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}
