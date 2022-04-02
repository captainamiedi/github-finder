import React from "react";
import ReactPaginate from "react-paginate";
import { GithubContext } from "../context/context";

export default function Pagination() {
  const { totalCount, handleClickPagination, error } =
    React.useContext(GithubContext);
  const handlePageClick = (event) => {
    handleClickPagination(event.selected);
  };
  return (
    !error.show && (
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    )
  );
}
