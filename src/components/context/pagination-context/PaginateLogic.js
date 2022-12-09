import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const paginationContext = createContext('');
export const usePaginationContext = () => useContext(paginationContext);

export const PaginationProvider = ({children}) =>{

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

// To change current page number
const handleClickPageNumber = (e) => {
setCurrentPage(Number(e.target.id));
};
//
const hanldeNext = () => {
setCurrentPage(currentPage + 1);
if (currentPage + 1 > maxPageNumberLimit) {
  setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
}
};

const handlePrev = () => {
setCurrentPage(currentPage - 1);
if ((currentPage - 1) % pageNumberLimit == 0) {
  setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
  setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
}
};

// To set total number of Pages
const pages = [];
for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
pages.push(i);
}

let pageIncrementBtn = null;
if (pages.length > maxPageNumberLimit) {
pageIncrementBtn = (
  <li onClick={hanldeNext} className="flex p-2 cursor-pointer text-xl">
    {" "}
    &hellip;{" "}
  </li>
);
}
let pageDecrementBtn = null;
if (minPageNumberLimit > 1) {
pageDecrementBtn = (
  <li onClick={handlePrev} className="flex p-2 cursor-pointer text-xl">
    {" "}
    &hellip;{" "}
  </li>
);
}

const renderPageNumbers = pages.map((number) => {
if (number < maxPageNumberLimit + 1 && number >= minPageNumberLimit) {
  return (
    <li
      key={number}
      id={number}
      className={`rounded-full p-3 m-2 cursor-pointer ${
        currentPage === number ? "bg-slate-500" : "bg-slate-300"
      }`}
      onClick={handleClickPageNumber}
    >
      {number}{" "}
    </li>
  );
} else return null;
});

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
// console.log(currentItems)
// console.log(users.length)

// ########################## How to work with Context ? ###################################
//1. wrap index with functionComponent and import the same as Component
//2. But inside return of context====> wrap with Contextconst.Provider
//3. import custom hook as component in whichever Component wants context values(using destructure)
  const value=
  { 
    users, 
    setUsers,
    pageDecrementBtn, 
    renderPageNumbers, 
    pageIncrementBtn, 
    handlePrev, 
    hanldeNext,
    currentPage,
    pages,
    currentItems
   }
  return <paginationContext.Provider value={value}>{children}</paginationContext.Provider>
}

