import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../../App";
import { DataSearch } from "../../App";
import URL from '../../url'

import DateRanges from '../../components/DateRange/DateRange'

import './SearchPopup.css'

function SearchPopup(props) {
  const [search, setSearch] = useContext(SearchContext)
  const [dataSearch, setSataSearch] = useContext(DataSearch)

  const [position, setPosition] = useState(search.position)
  const [aduilt, setAduilt] = useState(search.aduilt)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [children, setChildren] = useState(search.children)
  const [room, setRoom] = useState(search.room)


  useEffect(() => {
    setSearch(prev => {
      const update = {
        ...prev, position, aduilt, minPrice, maxPrice, children, room
      }
      return update
    })
  }, [position, aduilt, minPrice, maxPrice, children, room])

  async function searchHandle() {
    try {
      const res = await fetch(`${URL}search/`, {
        method: 'post',
        body: JSON.stringify({
          ...search
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.message) {
        throw new Error()
      } else {
        setSataSearch(data.results)
      }
    } catch (err) {
      alert('There are no hotel ')
    }
  }



  return (

    <div className='container-searchPopup'>
      <h2>Search</h2>
      <form>
        <div>
          <label>Destination</label><br />
          <input value={position} onChange={(e) => setPosition(e.target.value)} id='destination' type='text' />
        </div>
        <div >
          <label>Check-in Date</label><br />
          <DateRanges height='2.2rem' size='30' />
        </div>
        <div>
          <p>Optoins</p>
          <ul>
            <li><label>Min price per night </label>
              <input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                size='10' id=' min-price' type='number'
              /></li>
            <li><label>Max price per night </label>
              <input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                id='max-price' type='number' /></li>
            <li>
              <label>Aduilt </label>
              <input
                value={aduilt}
                onChange={(e) => setAduilt(e.target.value)}
                id='adult' type='number' /></li>
            <li>
              <label>Children </label>
              <input
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                id='children' type='number' /></li>
            <li>
              <label>Room </label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                id='room' type='number' />
            </li>
          </ul>
        </div>
        <button onClick={searchHandle} className='SearchPopup' type='button'> Search</button>
      </form>
    </div >
  )

}

export default SearchPopup