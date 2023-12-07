import { useState, useContext, useEffect } from "react";
import DateRanges from '../DateRange/DateRange';
import { DataSearch } from "../../App";

import { useNavigate } from "react-router-dom";
import './Header.css'
import { SearchContext } from "../../App";
import { DateRange1 } from "../../App";
import URL from '../../url'

function Header() {
  const navigate = useNavigate()
  const [dataSearch, setSataSearch] = useContext(DataSearch)
  const [dateRange, setDateRange] = useContext(DateRange1)
  const [search, setSearch] = useContext(SearchContext)

  const [position, setPosition] = useState()
  const [aduilt, setAduilt] = useState()
  const [children, setChildren] = useState()
  const [room, setRoom] = useState()


  useEffect(() => {
    setDateRange([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }])
  }, [])

  useEffect(() => {
    setSearch(prev => {
      const update = { ...prev }
      update.children = children
      update.position = position
      update.aduilt = aduilt
      update.room = room
      return update
    })
  }, [position, aduilt, children, room])

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
        throw new Error(`${data.message}`)
      } else {
        setSataSearch(data.results)
        navigate('/search')
      }
    } catch (err) {
      alert(`${err.message}`)
    }
  }

  return (
    <div style={{ position: 'relative' }} >

      <h2 className='title-header'>A lifetime of discounts? It's Genius.</h2>
      <div className='desc-header'>Get rewarded for your travals - unlock instant savings of 10% or more with a free account </div>
      <button className='btn-header'>Sign in / Registor</button>

      <div className='search-header'>
        <div>
          <i className='fa fa-bed'></i>
          <input
            onChange={(e) => setPosition(e.target.value.trim())}
            id='place' type='text' placeholder='Where are you going?' />
        </div>
        <div>
          <DateRanges icon size='26' />
        </div>
        <div>
          <i className='fa fa-female'></i>
          <input
            onChange={(e) => setAduilt(e.target.value)}
            id='noAdult'
            type='number'
            placeholder='1' />
          <label>adult  - </label>
          <input
            onChange={(e) => setChildren(e.target.value)}
            id='noAChildren'
            type='number'
            placeholder='0' />
          <label>children - </label>
          <input
            onChange={(e) => setRoom(e.target.value)}
            id='noRoom'
            type='number'
            placeholder='1' />
          <label>room</label>
        </div>
        <button onClick={searchHandle} className='btn-search'>Search</button>
      </div>

    </div>
  )
}

export default Header





