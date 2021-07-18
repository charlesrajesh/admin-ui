import { Form } from 'react-bootstrap'
import React from 'react'

function CheckBoxSelection ({ id, checkBoxSelection, checkBoxOnChange }) {
  return (
    <Form.Group
      className="d-flex justify-content-center"
      controlId="formBasicCheckbox"
    >
      <Form.Check
        type="checkbox"
        checked={!!checkBoxSelection[id]}
        onChange={(e) => {
          checkBoxOnChange(e.target.checked, id)
        }}
      />
    </Form.Group>
  )
}

export default CheckBoxSelection
