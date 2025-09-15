import { useEffect, useMemo, useState } from 'react'
import type { Item } from '../types'
import { loadItems, saveItems } from '../storage'

const isDesktop = typeof window !== 'undefined' && !!(window as any).api

export function useItems() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const init = async () => {
      if (isDesktop) {
        const rows = await (window as any).api.listItems()
        setItems(rows)
      } else {
        setItems(loadItems())
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (!isDesktop) saveItems(items)
  }, [items])

  const addItem = async (title: string, notes?: string) => {
    const now = Date.now()
    const item: Item = { id: crypto.randomUUID(), title, notes, createdAt: now, updatedAt: now }
    setItems(prev => [item, ...prev])
    if (isDesktop) await (window as any).api.addItem(item)
  }

  const deleteItem = async (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
    if (isDesktop) await (window as any).api.deleteItem(id)
  }

  const updateItem = async (id: string, patch: Partial<Omit<Item, 'id'|'createdAt'>>) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch, updatedAt: Date.now() } : i))
    // For brevity, left out DB update; add IPC handler if you need edit support now.
  }

  const api = useMemo(() => ({ addItem, deleteItem, updateItem }), [])
  return { items, ...api }
}
