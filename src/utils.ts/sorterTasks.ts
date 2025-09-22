import { SortOptions, Task } from '../types/types'

/**
 * Sorted tasks by select option.
 * @param tasks - Task[]
 * @param sortOption - selected option for sort
 * @returns new sorted Tasks[]
 */
export const sortedTasksBySortOption = (
  tasks: Task[],
  sortOption: SortOptions
): Task[] => {
  const compareDates = (a: Task, b: Task, asc = true): number => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return asc
      ? a.dueDate.getTime() - b.dueDate.getTime()
      : b.dueDate.getTime() - a.dueDate.getTime()
  }

  switch (sortOption) {
    case SortOptions.TITLE_ASC:
      return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
    case SortOptions.TITLE_DESC:
      return [...tasks].sort((a, b) => b.title.localeCompare(a.title))
    case SortOptions.DATE_ASC:
      return [...tasks].sort((a, b) => compareDates(a, b, true))
    case SortOptions.DATE_DESC:
      return [...tasks].sort((a, b) => compareDates(a, b, false))
    default:
      return [...tasks]
  }
}
