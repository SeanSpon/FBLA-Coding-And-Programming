import ItemForm from '../features/items/components/ItemForm'
import ItemList from '../features/items/components/ItemList'
import { useItems } from '../features/items/hooks/useItems'

export default function ItemsPage() {
  const { items, addItem, deleteItem } = useItems()
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <ItemForm onAdd={addItem} />
      <div className="h-4" />
      <ItemList items={items} onDelete={deleteItem} />
    </div>
  )
}
