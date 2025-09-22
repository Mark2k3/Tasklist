import React, { useCallback, useState } from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

import { Input, Button, Space, DatePicker, DatePickerProps } from 'antd'

import { TaskPreview } from '../../types/types'

dayjs.extend(customParseFormat)

interface ITaskForm {
  onAdd: (taskPreview: TaskPreview) => void
}
export const TaskForm = React.memo(({ onAdd }: ITaskForm) => {
  const [taskPreview, setTaskPreview] = useState<TaskPreview>({
    title: '',
    dueDate: null,
  })
  const [isInputStatus, setIsInputStatus] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTaskPreview((prev) => ({ ...prev, title: value }))

    if (isInputStatus && value.trim()) {
      setIsInputStatus(false)
    }
  }

  const handleAdd = useCallback(() => {
    if (!taskPreview.title.trim()) {
      setIsInputStatus(true)
      return
    }
    onAdd(taskPreview)

    setTaskPreview((prev) => ({ ...prev, title: '', dueDate: null }))
  }, [onAdd, taskPreview])

  const onChange: DatePickerProps['onChange'] = (date) => {
    setTaskPreview((prev) => ({
      ...prev,
      dueDate: date ? date.toDate() : null,
    }))
  }

  return (
    <Space size="middle">
      <DatePicker onChange={onChange} />
      <Input
        style={{ width: '250px' }}
        onPressEnter={handleAdd}
        onChange={handleInputChange}
        value={taskPreview.title}
        showCount
        maxLength={50}
        status={isInputStatus ? 'error' : undefined}
        placeholder="Add new task..."
      />
      <Button onClick={handleAdd} type="primary">
        Add
      </Button>
    </Space>
  )
})
