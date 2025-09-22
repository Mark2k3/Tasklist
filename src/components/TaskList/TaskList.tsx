import React from 'react'

import { List } from 'antd'

import { Task } from '../../types/types'
import { TaskItem } from './TaskItem'

interface ITasksList {
  tasks: Task[]
  onRemoveTask: (id: string) => void
  onEditTask: (updatedTask: Task) => void
}

export const TaskList = React.memo(
  ({ tasks, onRemoveTask, onEditTask }: ITasksList) => {
    const renderItem = (task: Task) => (
      <List.Item key={task.id} style={{ width: '100%', padding: 0 }}>
        <TaskItem
          task={task}
          onDeleteTask={onRemoveTask}
          onEditTask={onEditTask}
        />
      </List.Item>
    )

    return (
      <div style={{ width: '100%', maxWidth: 700 }}>
        <List
          header={<div style={{ textAlign: 'center' }}>Tasks List</div>}
          size="small"
          bordered
          dataSource={tasks}
          locale={{ emptyText: 'No tasks yet' }}
          renderItem={renderItem}
          style={{
            marginTop: 20,
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        />
      </div>
    )
  }
)
