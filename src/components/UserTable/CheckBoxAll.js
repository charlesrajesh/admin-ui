import { Form } from 'react-bootstrap'
import React from 'react'

function CheckBoxAll ({ page, checkBoxSelection, checkBoxAllOnChange }) {
  let checked = true
  const userIdsInCurrentPage = page.map((row) => row.original.id)
  userIdsInCurrentPage.forEach((id) => {
    if (!checkBoxSelection[id]) {
      checked = false
    }
  })
  return (
    <Form.Group
      className="d-flex justify-content-center"
      controlId="formBasicCheckbox"
    >
      <Form.Check
        type="checkbox"
        checked={!!checked}
        onChange={(e) => {
          checkBoxAllOnChange(e.target.checked, page)
        }}
      />
    </Form.Group>
  )
}

export default CheckBoxAll;