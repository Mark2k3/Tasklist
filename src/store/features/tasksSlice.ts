import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Task,
  TaskInput,
  TaskSource,
  TasksState,
  TaskStatus,
} from '../../types/types'
import { v4 as uuidv4 } from 'uuid'
import { getTasks } from '../../api/useTaskApi'

//artificial delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    // throw new Error('Test error')
    const tasks = await getTasks()
    await sleep(500)
    return tasks
  }
)

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskAction: (state, action: PayloadAction<TaskInput>) => {
      const newTask: Task = {
        id: uuidv4(),
        status: TaskStatus.TODO,
        source: TaskSource.LOCAL,
        ...action.payload,
      }
      state.tasks.push(newTask)
    },
    removeTaskAction: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },
    editTaskAction: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((t) =>
        t.id === action.payload.id ? action.payload : t
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong...'
      })
  },
})

export const { addTaskAction, removeTaskAction, editTaskAction } =
  tasksSlice.actions

export default tasksSlice.reducer
