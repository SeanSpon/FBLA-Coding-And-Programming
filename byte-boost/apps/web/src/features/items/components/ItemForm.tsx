import { useState } from 'react'

export default function ItemForm({ onAdd }: { onAdd: (title: string, notes?: string) => void }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (!title.trim()) return
        onAdd(title.trim(), notes.trim() || undefined)
        setTitle('')
        setNotes('')
      }}
      className="flex flex-col gap-2 max-w-md"
    >
      <input
        aria-label="Title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <textarea
        aria-label="Notes"
        placeholder="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button type="submit" className="border rounded px-3 py-2">Add</button>
    </form>
  )
}
