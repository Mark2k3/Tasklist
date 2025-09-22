export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  ALL = 'all-status',
}

export enum TaskSource {
  LOCAL = 'local',
  SERVER = 'server',
}

export enum SortOptions {
  DATE_ASC = 'date-asc',
  DATE_DESC = 'date-desc',
  TITLE_ASC = 'title-asc',
  TITLE_DESC = 'title-desc',
}

export interface Task {
  readonly id: string
  title: string
  status: TaskStatus
  dueDate: Date | null
  source: TaskSource
}

export interface ApiTask {
  id: number
  title: string
  completed: boolean
  dueDate: null
  source: TaskSource
}

export interface TaskInput {
  title: string
  dueDate: Date | null
}

export interface TaskPreview {
  title: string
  dueDate: Date | null
}

export interface EditedTask {
  title: string
  status: TaskStatus
  dueDate: Date | null
}

export interface Option<T> {
  value: T
  label: string
}

export interface SortGroup<T> {
  label: string;
  options: Option<T>[];
}

export interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export interface TasksFiltersState {
  statusFilter: TaskStatus
  sortFilter: SortOptions
}
