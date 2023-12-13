import React, {  useState } from 'react';
import ReactPaginate from 'react-paginate';




function Paging({ itemsPerPage,items,setPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setPage(event.selected)

  };

  return (
    <div className='my-10 bg-slate-500 '>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        breakClassName={'flex items-center justify-center '}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={'flex flex-row items-center justify-center h-16 bg-slate-400 gap-4'}
      />
    </div>
  );
}

export default Paging;