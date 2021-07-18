import React, { useEffect, useState } from 'react'
import './UserTable.css'
import { Table, Form, Button } from 'react-bootstrap'
import {
  useTable,
  useFilters,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
  usePagination,
  useGlobalFilter
} from 'react-table'
import sortAscendingIcon from '../../assets/sort_ascending_icon.svg'
import sortDecendingIcon from '../../assets/sort_decending_icon.svg'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { USER_TABLE_DELETE_SELECTED_BUTTON } from '../../constants/vocabConstants'
import { columns } from './UserTableConfig'
import Pagination from './Pagination'
import EditableCell from './EditableCell'
import GlobalFilter from './GlobalFilter'

const defaultColumn = {
  Cell: EditableCell
}

function DeleteSelected ({ deleteSelectedUsers }) {
  return (
    <Button
      variant="danger"
      onClick={() => {
        deleteSelectedUsers()
      }}
    >
      {USER_TABLE_DELETE_SELECTED_BUTTON}
    </Button>
  )
}

function UserTable ({ userList, onUpdate, onDeleteSelected, onDelete }) {
  const [data, setData] = useState([])
  const [changesList, setChangesList] = useState({})
  const [checkBoxSelection, setCheckBoxSelection] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const checkBoxOnChange = (checked, id) => {
    setCheckBoxSelection({ ...checkBoxSelection, [id]: checked })
  }

  const checkBoxAllOnChange = (checked, page) => {
    const temp = { ...checkBoxSelection }
    const userIdsInCurrentPage = page.map((row) => row.original.id)
    userIdsInCurrentPage.forEach((id) => {
      temp[id] = checked
    })
    setCheckBoxSelection(temp)
  }

  const deleteUser = ({ id }, page, pageCount) => {
    if (currentPage === pageCount - 1) {
      // if current page is last page and all user are deleted in current page move to first page
      const userIdsInCurrentPage = page.map((row) => row.original.id)
      if (userIdsInCurrentPage.length === 1) {
        setCurrentPage(0)
      }
    }
    onDelete(id)
  }

  const enableRowEdit = ({ id }) => {
    const newData = data.map((row) =>
      row.id === id ? { ...row, edit: true } : row
    )
    setData(newData)
  }

  const saveRow = (editedRow) => {
    onUpdate({ ...changesList[editedRow.id] })
    setChangesList({ ...changesList, [editedRow.id]: null })
    const newData = data.map((row) =>
      row.id === editedRow.id ? { ...row, edit: false } : row
    )
    setData(newData)
  }

  const updateMyData = ({ id }, columnId, value) => {
    const updatedChangeList = { ...changesList }
    updatedChangeList[id] = {
      ...updatedChangeList[id],
      [columnId]: value,
      id
    }
    setChangesList(updatedChangeList)
  }

  const deleteSelectedUsers = (page, pageCount) => {
    setCurrentPage(0)
    onDeleteSelected(checkBoxSelection)
    setCheckBoxSelection([])
  }

  useEffect(() => {
    setData(
      userList.map((row) => ({
        ...row,
        ...changesList[row.id],
        edit: !!changesList[row.id]
      }))
    )
  }, [userList, changesList])

  {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex, globalFilter }
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        deleteUser,
        enableRowEdit,
        updateMyData,
        saveRow,
        checkBoxOnChange,
        checkBoxSelection,
        checkBoxAllOnChange,
        initialState: { pageIndex: currentPage, pageSize: 10 }
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      useBlockLayout,
      useResizeColumns,
      usePagination
    )

    const isEditing = () => {
      return data.some((row) => row.edit)
    }
    if (userList.length === 0) {
      return (
        <div className="d-flex justify-content-center align-middle">
          USER LIST EMPTY
        </div>
      )
    } else {
      return (
        <>
          <div className="userTable">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <Table bordered {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                  <tr
                    key={headerGroupIndex}
                    {...headerGroup.getHeaderGroupProps()}
                    style={{ width: 'auto' }}
                  >
                    {headerGroup.headers.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? (
                                column.isSortedDesc
                                  ? (
                              <img
                                src={sortAscendingIcon}
                                className="ml-2 sort_icon"
                                alt=""
                              ></img>
                                    )
                                  : (
                              <img
                                src={sortDecendingIcon}
                                className="ml-2 sort_icon"
                                alt=""
                              ></img>
                                    )
                              )
                            : (
                                ''
                              )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.length > 0
                  ? (
                      page.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                      <tr
                        key={rowIndex}
                        {...row.getRowProps()}
                        style={{ width: 'auto' }}
                      >
                        {row.cells.map((cell, cellIndex) => {
                          return (
                            <td key={cellIndex} {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          )
                        })}
                      </tr>
                        )
                      })
                    )
                  : (
                  <div>Search List is empty</div>
                    )}
              </tbody>
            </Table>
            <DeleteSelected
              deleteSelectedUsers={() => {
                deleteSelectedUsers()
              }}
            />
          </div>
          <Pagination
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            nextPage={nextPage}
            pageCount={pageCount}
            isEditing={isEditing}
            setCurrentPage={setCurrentPage}
          />
          <ConfirmationModal />
        </>
      )
    }
  }
}

export default UserTable
