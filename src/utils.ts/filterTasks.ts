import { Task, TaskStatus } from '../types/types'

/**
 * filtered tasks by status.
 * @param tasks - Task[]
 * @param filterStatus - status for filter, TaskStatus.ALL returned all tasks
 * @returns filtered Task[]
 */
export const filterTasksByStatus = (
  tasks: Task[],
  filterStatus: TaskStatus
): Task[] => {
  return filterStatus === TaskStatus.ALL
    ? tasks
    : tasks.filter((task) => task.status === filterStatus)
}
