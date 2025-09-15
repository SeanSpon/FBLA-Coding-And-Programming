import { useEffect, useMemo, useState } from 'react'
import { loadItems, saveItems } from '../storage'
import type { Item } from '../types'

export function useItems() {
  const [items, setItems] = useState<Item[]>(() => loadItems())

  useEffect(() => {
    saveItems(items)
  }, [items])

  const addItem = (title: string, notes?: string) => {
    const now = Date.now()
    const item: Item = { id: crypto.randomUUID(), title, notes, createdAt: now, updatedAt: now }
    setItems(prev => [item, ...prev])
  }

  const updateItem = (id: string, patch: Partial<Omit<Item, 'id' | 'createdAt'>>) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, ...patch, updatedAt: Date.now() } : i)),
    )
  }

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const api = useMemo(() => ({ addItem, updateItem, deleteItem }), [])
  return { items, ...api }
}
