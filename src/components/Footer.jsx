import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Footer({ page, totalPages, handlePageChange }) {
  function generatePaginationItems() {
    const paginationItems = [];
    let left = Math.max(2, page - 2);
    let right = Math.min(totalPages - 1, page + 2);

    if (page - 1 <= 2) {
      right = 1 + 4;
    }

    if (totalPages - page <= 2) {
      left = totalPages - 4;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    return paginationItems;
  }

  return (
    <>
      <div className="pagination d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
          />
          {generatePaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
          />
        </Pagination>
      </div>
      <footer className="d-flex justify-content-center">
        Rijksmuseum Twenthe | Lasondersingel 129 | 7514 BP Enschede | 053 201
        2000
      </footer>
    </>
  );
}

export default Footer;
