import SearchListItem from './SearchListItem';
import { useState, useContext, useEffect } from "react";
import { DataSearch } from "../../App";
import './SearchList.css'

function SearchList() {
  const [dataSearch, setDataSearch] = useContext(DataSearch)

  return (
    <div>
      {dataSearch && dataSearch.map(search => (
        <SearchListItem key={search._id} items={search} />
      ))}
    </div>
  )
}

export default SearchList