import React, { useCallback, useState } from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Modal,
  Select,
  Space,
} from 'antd'

import styles from './TaskList.css'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { EditedTask, Task, TaskSource, TaskStatus } from '../../types/types'
import { optionsStatusTask } from '../../utils.ts/constants'

interface ITaskItem {
  task: Task
  onDeleteTask: (id: string) => void
  onEditTask: (updatedTask: Task) => void
}

dayjs.extend(customParseFormat)

const getInitialEditedTask = (task: Task): EditedTask => ({
  title: task.title,
  status: task.status,
  dueDate: task.dueDate,
})

export const TaskItem = React.memo(
  ({ task, onDeleteTask, onEditTask }: ITaskItem) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [inputStatus, setInputStatus] = useState(false)
    const [editedTask, setEditedTask] = useState<EditedTask>(
      getInitialEditedTask(task)
    )

    const showModal = () => {
      setEditedTask(getInitialEditedTask(task))
      setIsModalOpen(true)
    }

    const handleSaveEdit = () => {
      if (!editedTask.title.trim()) {
        setInputStatus(true)
        return
      }
      onEditTask({ ...task, ...editedTask })
      setIsModalOpen(false)
    }

    const handleCloseEdit = () => {
      setEditedTask(getInitialEditedTask(task))
      setIsModalOpen(false)
    }

    const handleDeleteClick = () => {
      setIsConfirmModalOpen(true)
    }

    const handleConfirmDelete = () => {
      onDeleteTask(task.id)
      setIsConfirmModalOpen(false)
    }

    const handleCancelDelete = () => {
      setIsConfirmModalOpen(false)
    }

    const handleStatusChange = useCallback((status: TaskStatus) => {
      setEditedTask((prev) => ({ ...prev, status }))
    }, [])

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask((prev) => ({ ...prev, title: e.target.value }))

        if (inputStatus && e.target.value.trim()) {
          setInputStatus(false)
        }
      },
      [inputStatus]
    )

    const onChange: DatePickerProps['onChange'] = (date) => {
      setEditedTask((prev) => ({
        ...prev,
        dueDate: date ? date.toDate() : null,
      }))
    }

    return (
      <>
        <Modal
          title="Edit task"
          closeIcon={<span aria-label="Close edit modal">×</span>}
          open={isModalOpen}
          onOk={handleSaveEdit}
          onCancel={handleCloseEdit}
          destroyOnHidden
        >
          <Space direction="vertical">
            <Select
              className={styles['taskList__taskItemSelect']}
              value={editedTask.status}
              onChange={handleStatusChange}
              options={optionsStatusTask}
            />
            <Input
              className={styles['taskList__taskItemInput']}
              onChange={handleInputChange}
              value={editedTask.title}
              showCount
              maxLength={50}
              status={inputStatus ? 'error' : undefined}
              placeholder="Edit title..."
            />
            {inputStatus ? (
              <span className={styles['taskList__inputError']}>
                Title is required
              </span>
            ) : null}
            <DatePicker
              value={editedTask.dueDate ? dayjs(editedTask.dueDate) : null}
              onChange={onChange}
            />
          </Space>
        </Modal>
        <Modal
          title="Confirm deletion"
          closeIcon={<span aria-label="Close edit modal">×</span>}
          open={isConfirmModalOpen}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          destroyOnHidden
          okText="Yes, delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete the task "{task.title}"?</p>
        </Modal>
        <div className={styles['taskList__item']}>
          <div className={styles['taskList__itemInfo']}>
            <div className={styles['taskList__itemTitle']}>
              Title: {task.title}
            </div>
            {task.dueDate && (
              <div className={styles['taskList__itemDate']}>
                Due date: {dayjs(task.dueDate).format('YYYY-MM-DD')}
              </div>
            )}
            <div className={styles['taskList__itemStatus']}>
              Status: {task.status}
            </div>
          </div>
          <div className={styles['taskList__menuItem']}>
            {task.source === TaskSource.LOCAL && (
              <>
                <Button
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={handleDeleteClick}
                  danger
                  title="Delete"
                />

                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={showModal}
                  title="Edit"
                />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
)
