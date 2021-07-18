import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

function GlobalFilter ({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <input
      className="searchBar"
      value={value || ''}
      placeholder={' Search . . .'}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      style={{
        fontSize: '1.1rem'
      }}
    />
  )
}

export default GlobalFilter
