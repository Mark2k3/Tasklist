import { Flex, Spin } from 'antd'
import { Task } from '../../types/types'
import { TaskList } from '../TaskList'

interface ITasksContent {
  loading: boolean
  error: string | null
  sortedTasks: Task[]
  onRemoveTask: (id: string) => void
  onEditTask: (updatedTask: Task) => void
}

export const TasksContent = ({
  loading,
  error,
  sortedTasks,
  onRemoveTask,
  onEditTask,
}: ITasksContent) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 250 }}>
        <Spin size="large" />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 250 }}>
        <span style={{ color: 'red' }}>{error}</span>
      </Flex>
    )
  }

  return (
    <TaskList
      tasks={sortedTasks}
      onRemoveTask={onRemoveTask}
      onEditTask={onEditTask}
    />
  )
}
