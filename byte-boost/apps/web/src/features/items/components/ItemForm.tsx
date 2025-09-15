import { useState } from 'react'

export default function ItemForm({ onAdd }: { onAdd: (title: string, notes?: string) => void }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <form
      aria-label="Add item"
      onSubmit={e => {
        e.preventDefault()
        const t = title.trim()
        const n = notes.trim()
        if (!t) return
        onAdd(t, n || undefined)
        setTitle('')
        setNotes('')
      }}
      className="flex flex-col gap-2 max-w-md"
    >
      <label>
        <span className="sr-only">Title</span>
        <input
          aria-label="Title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input"
        />
      </label>

      <label>
        <span className="sr-only">Notes</span>
        <textarea
          aria-label="Notes"
          placeholder="Notes (optional)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="textarea"
        />
      </label>

      <button type="submit" className="btn">Add</button>
    </form>
  )
}
