import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    const visiblePages = 5; // Number of visible page numbers

    if (totalPages <= visiblePages) {
      // Display all page numbers if the total pages are less than or equal to the visible pages
      return pageNumbers.map((pageNumber) => renderPageNumber(pageNumber));
    } else {
      // Calculate the start and end indices of the visible page numbers
      let startIndex = currentPage - Math.floor(visiblePages / 2);
      let endIndex = startIndex + visiblePages - 1;

      if (startIndex < 1) {
        startIndex = 1;
        endIndex = visiblePages;
      } else if (endIndex > totalPages) {
        endIndex = totalPages;
        startIndex = endIndex - visiblePages + 1;
      }

      const visiblePageNumbers = pageNumbers.slice(startIndex - 1, endIndex);

      const pageElements = visiblePageNumbers.map((pageNumber) =>
        renderPageNumber(pageNumber)
      );

      // Add ellipsis if necessary
      if (startIndex > 1) {
        pageElements.unshift(renderEllipsis());
      }
      if (endIndex < totalPages) {
        pageElements.push(renderEllipsis());
      }

      return pageElements;
    }
  };

  const renderPageNumber = (pageNumber) => {
    return (
      <li key={pageNumber}>
        <a
          href="#"
          onClick={() => handlePageChange(pageNumber)}
          className={`mx-1.5 mb-1.5 p-3 cursor-pointer rounded-full min-h-[48px] h-10 w-10 min-w-[48px] z-10 flex justify-center items-center align-middle bg-gray-100 hover:bg-gray-200 hover:scale-105 border-2 ${
            currentPage === pageNumber ? "border-black" : "border-transparent"
          }`}
        >
          {pageNumber}
        </a>
      </li>
    );
  };

  const renderEllipsis = () => {
    return (
      <li>
        <span className="px-3 py-2 leading-tight">...</span>
      </li>
    );
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className={`mr-1.5 mb-1.5 p-3 rounded-full min-h-[48px] min-w-[48px] z-10 flex justify-center items-center align-middle bg-gray-100 hover:bg-gray-200 hover:scale-105 ${
              currentPage === 1
                ? " cursor-not-allowed bg-gray-50 hover:bg-gray-50 "
                : " cursor-pointer  "
            }`}
          >
            <ArrowLeftIcon
              className={`w-4 h-4 stroke-[3] ${
                currentPage === 1 ? " text-gray-400 " : " text-gray-900 "
              }`}
            />
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            href="#"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className={`ml-1.5 mb-1.5 p-3 rounded-full min-h-[48px] min-w-[48px] z-10 flex justify-center items-center align-middle bg-gray-100 hover:bg-gray-200 hover:scale-105 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-50 hover:bg-gray-50"
                : " cursor-pointer  "
            }`}
          >
            <ArrowRightIcon
              className={`w-4 h-4 stroke-[3] ${
                currentPage === totalPages
                  ? " text-gray-400 "
                  : " text-gray-900 "
              }`}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
