import { useMemo, useCallback, useEffect } from 'react'

import { Flex, Layout, message } from 'antd'

import styles from './TasksListForm.css'

import { SortOptions, Task, TaskPreview, TaskStatus } from '../../types/types'
import { sortedTasksBySortOption } from '../../utils.ts/sorterTasks'
import { filterTasksByStatus } from '../../utils.ts/filterTasks'
import { StatusFilter } from '../StatusFilter'
import { SortSelector } from '../SortSelector'
import { TaskForm } from '../TaskForm'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  addTaskAction,
  editTaskAction,
  fetchTasks,
  removeTaskAction,
} from '../../store/features/tasksSlice'
import {
  setTaskSortFilter,
  setTaskStatusFilter,
} from '../../store/features/tasksFilters'
import { RootState } from '../../store/store'
import { TasksContent } from '../TasksContent'
import {
  notifyTaskAdded,
  notifyTaskEdited,
  notifyTaskRemoved,
  notifyTasksLoad,
} from '../../notifications'

const { Header, Content } = Layout

export const TasksListForm = () => {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector(
    (state: RootState) => state.tasks
  )
  const { statusFilter, sortFilter } = useAppSelector(
    (state: RootState) => state.filters
  )

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  useEffect(() => {
    if (error) notifyTasksLoad(messageApi, error)
  }, [error, messageApi])

  const addTask = useCallback(
    (taskPreview: TaskPreview) => {
      dispatch(
        addTaskAction({
          ...taskPreview,
        })
      )
      notifyTaskAdded(messageApi)
    },
    [messageApi, dispatch]
  )

  const removeTask = useCallback(
    (id: string) => {
      dispatch(removeTaskAction(id))
      notifyTaskRemoved(messageApi)
    },
    [messageApi, dispatch]
  )

  const editTask = useCallback(
    (updatedTask: Task) => {
      dispatch(editTaskAction(updatedTask))
      notifyTaskEdited(messageApi)
    },
    [messageApi, dispatch]
  )

  const handleStatusFilterChange = useCallback(
    (status: TaskStatus) => {
      dispatch(setTaskStatusFilter(status))
    },
    [dispatch]
  )

  const handleSortFilterChange = useCallback(
    (value: SortOptions) => {
      dispatch(setTaskSortFilter(value))
    },
    [dispatch]
  )

  const filteredTasks = useMemo(
    () => filterTasksByStatus(tasks, statusFilter),
    [tasks, statusFilter]
  )

  const sortedTasks = useMemo(() => {
    return sortedTasksBySortOption(filteredTasks, sortFilter)
  }, [filteredTasks, sortFilter])

  return (
    <Flex className={styles['app']}>
      {contextHolder}
      <Layout className={styles['app__layout']}>
        <Header className={styles['app__header']}>
          <Flex justify="space-between" align="center">
            <span>Tasks App</span>
            <Flex gap={12}>
              <SortSelector
                sortValue={sortFilter}
                onChangeSort={handleSortFilterChange}
              />
              <StatusFilter
                onChangeStatus={handleStatusFilterChange}
                selectedStatus={statusFilter}
              />
            </Flex>
          </Flex>
        </Header>
        <Content className={styles['app__content']}>
          <TaskForm onAdd={addTask} />
          <TasksContent
            loading={loading}
            error={error}
            sortedTasks={sortedTasks}
            onRemoveTask={removeTask}
            onEditTask={editTask}
          />
        </Content>
      </Layout>
    </Flex>
  )
}
