import { ApiTask, Task, TaskSource, TaskStatus } from '../types/types'

/**
 * from server apiTask to frontend Task
 * - id: string
 * - status: TaskStatus
 * - dueDate: Date | null
 * - source: TaskSource
 */
const adaptApiTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id.toString(),
  title: apiTask.title,
  status: apiTask.completed ? TaskStatus.DONE : TaskStatus.TODO,
  dueDate: apiTask.dueDate ? new Date(apiTask.dueDate) : null,
  source: TaskSource.SERVER,
})

export const adaptApiTasks = (apiTasks: ApiTask[]): Task[] =>
  apiTasks.map(adaptApiTask)
