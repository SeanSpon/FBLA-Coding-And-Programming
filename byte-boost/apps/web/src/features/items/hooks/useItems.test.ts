import { renderHook, act } from '@testing-library/react'
import { useItems } from './useItems'

beforeEach(() => localStorage.clear())

it('adds and deletes items', () => {
  const { result } = renderHook(() => useItems())
  act(() => result.current.addItem('Test', 'Note'))
  expect(result.current.items[0].title).toBe('Test')
  act(() => result.current.deleteItem(result.current.items[0].id))
  expect(result.current.items.length).toBe(0)
})
