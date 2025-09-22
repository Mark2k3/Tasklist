import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortOptions, TasksFiltersState, TaskStatus } from '../../types/types'

const initialState: TasksFiltersState = {
  statusFilter: TaskStatus.ALL,
  sortFilter: SortOptions.TITLE_ASC,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTaskStatusFilter: (state, action: PayloadAction<TaskStatus>) => {
      state.statusFilter = action.payload
    },
    setTaskSortFilter: (state, action: PayloadAction<SortOptions>) => {
      state.sortFilter = action.payload
    },
  },
})

export const { setTaskStatusFilter, setTaskSortFilter } = filtersSlice.actions
export default filtersSlice.reducer
