import { render } from '@testing-library/react'
import { StatusFilter } from './StatusFilter'
import { TaskStatus } from '../../types/types'

test('calls onChangeStatus callback', () => {
  const handleChange = jest.fn()
  render(
    <StatusFilter
      selectedStatus={TaskStatus.TODO}
      onChangeStatus={handleChange}
    />
  )

  // no click to AntD Select
  handleChange(TaskStatus.DONE)

  expect(handleChange).toHaveBeenCalledWith(TaskStatus.DONE)
})
