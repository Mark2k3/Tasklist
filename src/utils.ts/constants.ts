import { SortOptions, TaskStatus, Option, SortGroup } from '../types/types'

export const optionsStatusTask: Option<TaskStatus>[] = [
  { value: TaskStatus.TODO, label: 'To Do' },
  { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TaskStatus.DONE, label: 'Done' },
]

export const optionsStatusFilterTasks: Option<TaskStatus>[] = [
  ...optionsStatusTask,
  { value: TaskStatus.ALL, label: 'All' },
]

export const optionsSortSelector: SortGroup<SortOptions>[] = [
  {
    label: 'Date',
    options: [
      { label: 'ascending', value: SortOptions.DATE_ASC },
      { label: 'descending', value: SortOptions.DATE_DESC },
    ],
  },
  {
    label: 'Title',
    options: [
      { label: 'A - Z', value: SortOptions.TITLE_ASC },
      { label: 'Z - A', value: SortOptions.TITLE_DESC },
    ],
  },
]
