import type { Item } from '../types'

export default function ItemList({
  items,
  onDelete,
}: {
  items: Item[]
  onDelete: (id: string) => void
}) {
  if (!items.length) return <p>No items yet — add one 👇</p>
  return (
    <ul className="flex flex-col gap-2">
      {items.map(i => (
        <li key={i.id} className="border rounded p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{i.title}</div>
            {i.notes ? <div className="text-sm opacity-70">{i.notes}</div> : null}
          </div>
          <button className="text-sm underline" onClick={() => onDelete(i.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
