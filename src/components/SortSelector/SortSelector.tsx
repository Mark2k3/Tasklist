import React from 'react'

import { Select } from 'antd'

import { SortOptions } from '../../types/types'
import { optionsSortSelector } from '../../utils.ts/constants'

interface ISortSelector {
  sortValue: SortOptions
  onChangeSort: (value: SortOptions) => void
}

export const SortSelector = React.memo(
  ({ sortValue, onChangeSort }: ISortSelector) => {
    return (
      <Select<SortOptions>
        style={{ width: '150px' }}
        value={sortValue}
        onChange={(value) => onChangeSort(value)}
        options={optionsSortSelector}
        placeholder="Choose sort..."
      />
    )
  }
)
