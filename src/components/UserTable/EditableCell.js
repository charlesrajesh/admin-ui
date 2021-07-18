import React, { useState } from 'react'

function EditableCell ({
  value: initialValue,
  column: { id },
  updateMyData,
  cell: {
    row: { original }
  }
}) {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    updateMyData(original, id, value)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue, original])

  return original.edit
    ? (
    <input
      className="edit-input"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
      )
    : (
        value
      )
}

export default EditableCell
