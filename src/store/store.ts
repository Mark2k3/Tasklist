import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/tasksSlice'
import filterReducer from './features/tasksFilters'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
