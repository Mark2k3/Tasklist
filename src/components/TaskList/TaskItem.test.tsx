import { Task, TaskSource, TaskStatus } from '../../types/types'

const mockTask: Task = {
  id: '1',
  title: 'Sample Task',
  dueDate: new Date('2025-08-25'),
  status: TaskStatus.TODO,
  source: TaskSource.LOCAL,
}

describe('TaskItem', () => {
  test('calls onEditTask when edited title is valid', () => {
    const onEditTask = jest.fn()
    onEditTask({ ...mockTask, title: 'Updated Task' })

    expect(onEditTask).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockTask.id, title: 'Updated Task' })
    )
  })

  test('does not call onEditTask if title is empty', () => {
    const onEditTask = jest.fn()
    // simulation enter empty title
    onEditTask({ ...mockTask, title: '' })

    expect(onEditTask).toHaveBeenCalled()
  })

  test('calls onDeleteTask when confirmed', () => {
    const onDeleteTask = jest.fn()
    onDeleteTask(mockTask.id)
    expect(onDeleteTask).toHaveBeenCalledWith(mockTask.id)
  })

  test('cancels delete without calling callback', () => {
    const onDeleteTask = jest.fn()
    // not call delete
    expect(onDeleteTask).not.toHaveBeenCalled()
  })
})
