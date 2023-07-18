/**
 *
 * Pagination
 *
 */

import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/productSlice';

const Pagination = () => {
  const { totalPages } = useSelector(state => state.product.diteils)
  const dispatch = useDispatch()
  const displayPagination = Number(totalPages) > 1;

  const handlePageClick = event => {
    window.scrollTo(0,0)
    dispatch(setFilter({page: event.selected + 1}))
  };

  return displayPagination ? (
    <div className='d-flex justify-content-center text-center mt-4'>
      <div className='pagination-box'>
        <ReactPaginate
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages} // The total number of pages.
          previousLabel='< previous'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          // activeClassName='active'
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  ):null;
};

export default Pagination;
