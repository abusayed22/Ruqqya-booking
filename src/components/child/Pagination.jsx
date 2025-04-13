import { Icon } from "@iconify/react";
import React from "react";

function Pagination({ page, totalPage, setPage }) {
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage && pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  return (
    <div>
      <ul className="pagination d-flex flex-wrap align-items-center justify-content-center mt-10">
        <li className="page-item">
          <div
            className={`page-div bg-primary-50 text-secondary-light fw-medium border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px rounded-pill rounded-end-0 ${
              page === 1 ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(page - 1)}
          >
            <Icon icon="iconamoon:arrow-left-2-light" className="text-xxl" />
          </div>
        </li>

        {pages.map((pg) => (
          <li className="page-item" key={pg}>
            <div
              className={`page-div border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px ${
                pg === page
                  ? "bg-primary-600 text-white"
                  : "bg-primary-50 text-secondary-light"
              }`}
              onClick={() => handlePageChange(pg)}
            >
              {pg}
            </div>
          </li>
        ))}

        <li className="page-item">
          <div
            className={`page-div bg-primary-50 text-secondary-light fw-medium border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px rounded-pill rounded-start-0 ${
              page === totalPage ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            <Icon icon="iconamoon:arrow-right-2-light" className="text-xxl" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
