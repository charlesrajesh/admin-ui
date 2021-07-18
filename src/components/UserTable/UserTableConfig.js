import React from 'react'
import {
  USER_TABLE_ACTIONS_HEADER,
  USER_TABLE_EMAIL_HEADER,
  USER_TABLE_ROLE_HEADER,
  USER_TABLE_USERNAME_HEADER
} from '../../constants/vocabConstants'
import editIcon from '../../assets/edit_icon.svg'
import saveIcon from '../../assets/save_icon.svg'
import removeIcon from '../../assets/remove_icon.svg'
import CheckBoxAll from './CheckBoxAll'
import CheckBoxSelection from './CheckBoxSelection'

export const columns = [
  {
    Header: ({ page, checkBoxSelection, checkBoxAllOnChange }) => {
      return (
        <CheckBoxAll
          page={page}
          checkBoxSelection={checkBoxSelection}
          checkBoxAllOnChange={checkBoxAllOnChange}
        />
      )
    },
    accessor: 'select',
    Cell: ({ row: { original }, checkBoxOnChange, checkBoxSelection }) => (
      <CheckBoxSelection
        id={original.id}
        checkBoxSelection={checkBoxSelection}
        checkBoxOnChange={checkBoxOnChange}
      />
    ),
    disableSortBy: true
  },
  {
    Header: USER_TABLE_USERNAME_HEADER,
    accessor: 'name',
    filter: 'fuzzyText'
  },
  {
    Header: USER_TABLE_EMAIL_HEADER,
    accessor: 'email',
    filter: 'fuzzyText'
  },
  {
    Header: USER_TABLE_ROLE_HEADER,
    accessor: 'role',
    filter: 'fuzzyText'
  },
  {
    Header: USER_TABLE_ACTIONS_HEADER,
    accessor: 'actions',
    Cell: ({ row: { original }, deleteUser, enableRowEdit, saveRow , page, pageCount}) => (
      <div className="d-flex justify-content-around">
        {!original.edit
          ? (
          <img
            src={editIcon}
            alt=""
            className="edit-image"
            onClick={(e) => {
              enableRowEdit(original)
            }}
          ></img>
            )
          : (
          <img
            src={saveIcon}
            alt=""
            className="remove-image"
            onClick={(e) => {
              saveRow(original)
            }}
          ></img>
            )}
        <img
          src={removeIcon}
          alt=""
          className="remove-image"
          onClick={(e) => {
            deleteUser(original, page, pageCount)
          }}
        ></img>
      </div>
    ),
    disableSortBy: true
  }
]
