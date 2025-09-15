import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ItemForm from './ItemForm'

describe('ItemForm', () => {
  it('submits title + optional notes', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ItemForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/title/i), 'Milk')
    await user.type(screen.getByLabelText(/notes/i), '2%')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalledWith('Milk', '2%')
  })
})
