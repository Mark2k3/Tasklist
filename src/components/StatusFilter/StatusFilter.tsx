import React from 'react'

import { Select } from 'antd'

import { TaskStatus } from '../../types/types'
import { optionsStatusFilterTasks } from '../../utils.ts/constants'

interface IStatusFilter {
  selectedStatus: TaskStatus
  onChangeStatus: (status: TaskStatus) => void
}

export const StatusFilter = React.memo(
  ({ selectedStatus, onChangeStatus }: IStatusFilter) => {
    return (
      <Select<TaskStatus>
        style={{ width: 140 }}
        value={selectedStatus}
        onChange={onChangeStatus}
        options={optionsStatusFilterTasks}
        placeholder="Select task status..."
      />
    )
  }
)
