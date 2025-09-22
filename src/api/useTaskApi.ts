import { ApiTask, Task } from '../types/types'
import { adaptApiTasks } from '../utils.ts/adaptApiTask'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const TASKS_LOAD_LIMIT: number = 2

export const getTasks = async (): Promise<Task[]> => {
  const url = new URL('/todos', BASE_URL)
  url.searchParams.set('_limit', TASKS_LOAD_LIMIT.toString())

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: ApiTask[] = await response.json()
    return adaptApiTasks(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    console.error('Fetch tasks error:', message)
    throw new Error(`Failed to fetch tasks: ${message}`)
  }
}
