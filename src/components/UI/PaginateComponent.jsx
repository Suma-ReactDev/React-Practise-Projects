import {usePaginationContext} from '../../components/main';
const PaginateComponent = () => {
 const {handlePrev,currentPage,pages,pageDecrementBtn,renderPageNumbers,pageIncrementBtn,hanldeNext}=usePaginationContext()
  
  return (
      <ul className="flex bg-white list-none place-content-center">
        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage <= pages[0] ? true : false}
            className={`rounded-sm bg-slate-400 p-3 m-2 cursor-pointer `}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={hanldeNext}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
            className={`rounded-sm bg-slate-400 p-3 m-2 cursor-pointer`}
          >
            Next
          </button>
        </li>
      </ul>
  )
}

export default PaginateComponent