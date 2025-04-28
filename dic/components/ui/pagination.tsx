import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}) => {
  const handleClick = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className=" flex items-center justify-between px-4">
      {/* Showing page details */}
      <p className="text-gray-600 text-sm font-medium">
        Showing {currentPage} of {totalPages} entries
      </p>

      {/* Pagination buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          className={`px-4 py-2 h-9 rounded-md font-bold text-xs text-gray-500 bg-gray-100 ${
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
        >
          Previous
        </button>

        {/* Current page button */}
        <button
          className="px-4 py-2 h-9 rounded-md font-bold text-xs text-white bg-primary hover:bg-blue-700"
          disabled
        >
          {currentPage}
        </button>

        {/* Next button */}
        <button
          className={`px-4 py-2 h-9 rounded-md font-bold text-xs text-gray-500 bg-gray-100 ${
            currentPage === totalPages
              ? 'cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
