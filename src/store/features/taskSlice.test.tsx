import tasksReducer, {
  addTaskAction,
  removeTaskAction,
  editTaskAction,
  fetchTasks,
} from './tasksSlice'
import { Task, TaskStatus, TaskSource } from '../../types/types'

describe('tasks slice', () => {
  const initialState = { tasks: [], loading: false, error: null }

  test('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle addTaskAction', () => {
    const action = addTaskAction({ title: 'New Task', dueDate: null })
    const state = tasksReducer(initialState, action)
    expect(state.tasks.length).toBe(1)
    expect(state.tasks[0]).toMatchObject({
      title: 'New Task',
      status: TaskStatus.TODO,
      source: TaskSource.LOCAL,
      dueDate: null,
    })
  })

  test('should handle removeTaskAction', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      status: TaskStatus.TODO,
      source: TaskSource.LOCAL,
      dueDate: null,
    }
    const stateWithTask = { ...initialState, tasks: [task] }
    const action = removeTaskAction('1')
    const state = tasksReducer(stateWithTask, action)
    expect(state.tasks.length).toBe(0)
  })

  test('should handle editTaskAction', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      status: TaskStatus.TODO,
      source: TaskSource.LOCAL,
      dueDate: null,
    }
    const stateWithTask = { ...initialState, tasks: [task] }
    const action = editTaskAction({ ...task, title: 'Updated Task' })
    const state = tasksReducer(stateWithTask, action)
    expect(state.tasks[0].title).toBe('Updated Task')
  })

  test('should handle fetchTasks pending', () => {
    const action = { type: fetchTasks.pending.type }
    const state = tasksReducer(initialState, action)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('should handle fetchTasks fulfilled', () => {
    const tasks = [
      { id: '1', title: 'Task 1', status: TaskStatus.TODO, source: TaskSource.LOCAL, dueDate: null },
    ]
    const action = { type: fetchTasks.fulfilled.type, payload: tasks }
    const state = tasksReducer(initialState, action)
    expect(state.tasks).toEqual(tasks)
    expect(state.loading).toBe(false)
  })

  test('should handle fetchTasks rejected', () => {
    const action = { type: fetchTasks.rejected.type, error: { message: 'Error fetching' } }
    const state = tasksReducer(initialState, action)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Error fetching')
  })
})
