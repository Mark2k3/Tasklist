import { MessageInstance } from 'antd/es/message/interface'

export const notifyTaskAdded = (message: MessageInstance) =>
  message.success('Task was added successfully')

export const notifyTaskEdited = (message: MessageInstance) =>
  message.success('Task was edited successfully')

export const notifyTaskRemoved = (message: MessageInstance) =>
  message.info('Task was deleted successfully')

export const notifyTasksLoad = (message: MessageInstance, error: string) =>
  message.error(error ?? 'Failed to load tasks', 5)
