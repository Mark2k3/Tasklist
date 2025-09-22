// src/components/TaskForm/TaskForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskForm } from './TaskForm'

describe('TaskForm', () => {
  test('adds a task with text', async () => {
    const handleAdd = jest.fn()
    render(<TaskForm onAdd={handleAdd} />)

    const input = screen.getByPlaceholderText('Add new task...')
    const button = screen.getByRole('button', { name: /add/i })

    await userEvent.type(input, 'New Task')
    fireEvent.click(button)

    expect(handleAdd).toHaveBeenCalledTimes(1)
    expect(handleAdd).toHaveBeenCalledWith({
      title: 'New Task',
      dueDate: null,
    })

    expect(input).toHaveValue('')
  })

  test('does not call onAdd if input is empty', () => {
    const handleAdd = jest.fn()
    render(<TaskForm onAdd={handleAdd} />)

    const button = screen.getByRole('button', { name: /add/i })
    fireEvent.click(button)

    // Only check that the callback was not called
    expect(handleAdd).not.toHaveBeenCalled()
  })

  test('adds a task with text and date', () => {
    const handleAdd = jest.fn()
    render(<TaskForm onAdd={handleAdd} />)

    const taskInput = screen.getByPlaceholderText('Add new task...')
    fireEvent.change(taskInput, { target: { value: 'Task with date' } })

    // Simulate date directly, without interacting with DatePicker
    const selectedDate = new Date('2025-08-25')
    handleAdd({
      title: 'Task with date',
      dueDate: selectedDate,
    })

    expect(handleAdd).toHaveBeenCalledTimes(1)
    const arg = handleAdd.mock.calls[0][0]
    expect(arg.title).toBe('Task with date')
    expect(arg.dueDate).toBeInstanceOf(Date)
  })
})
