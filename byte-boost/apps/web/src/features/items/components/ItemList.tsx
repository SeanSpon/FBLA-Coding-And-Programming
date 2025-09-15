import type { Item } from '../types'

export default function ItemList({
  items,
  onDelete,
}: {
  items: Item[]
  onDelete: (id: string) => void
}) {
  if (!items.length) return <p className="muted">No items yet — add one 👆</p>
  return (
    <ul className="stack">
      {items.map(i => (
        <li key={i.id} className="row card">
          <div>
            <div className="font-medium">{i.title}</div>
            {i.notes ? <div className="text-sm opacity-70">{i.notes}</div> : null}
          </div>
          <button className="btn subtle" aria-label={`Delete ${i.title}`} onClick={() => onDelete(i.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
