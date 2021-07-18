import React from 'react'

function Pagination ({
  gotoPage,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageIndex,
  pageCount,
  isEditing,
  setCurrentPage
}) {
  return (
    <div className="pagination d-flex justify-content-center">
      <button
        onClick={() => {
          gotoPage(0)
          setCurrentPage(0)
        }}
        className="quick-page-access"
        disabled={!canPreviousPage || isEditing()}
      >
        {'<<'}
      </button>
      <button
        onClick={() => {
          previousPage()
          setCurrentPage(pageIndex - 1)
        }}
        className="quick-page-access"
        disabled={!canPreviousPage || isEditing()}
      >
        {'<'}
      </button>
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => {
            gotoPage(index)
            setCurrentPage(index)
          }}
          className={
            pageIndex === index ? 'page-number current' : 'page-number'
          }
          disabled={isEditing()}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => {
          nextPage()
          setCurrentPage(pageIndex + 1)
        }}
        className="quick-page-access"
        disabled={!canNextPage || isEditing()}
      >
        {'>'}
      </button>
      <button
        onClick={() => {
          gotoPage(pageCount - 1)
          setCurrentPage(pageCount - 1)
        }}
        className="quick-page-access"
        disabled={!canNextPage || isEditing()}
      >
        {'>>'}
      </button>
    </div>
  )
}

export default Pagination
