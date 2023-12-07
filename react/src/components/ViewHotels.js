import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from 'react-router-dom';
import URL from '../url'

function ViewHotels() {

  const [hotels, setHotels] = useState()
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ? 'type' : 'city'
  const serachType = searchParams.get('type') ? searchParams.get('type') : searchParams.get('city')

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(`${URL}hotel?${type}=${serachType}`)
        const data = await res.json()
        console.log(data);
        if (data.message) {
          throw new Error(data.message)
        } else {
          setHotels(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi()
  }, [])

  if (hotels && hotels.length > 0) {

    return (
      <div style={{ margin: '24px auto 24px auto', width: 1200 }}>
        <h3>Hotels</h3>
        <div className='container-listhotels'>
          {hotels.map(hotel => (
            <div className='' key={hotel['name']}>
              <img src={hotel['photos'][0]} alt={hotel['name']} width='100%' height='300px' />
              <Link to={`/detail/${hotel._id}`}><b>{hotel['name']}</b></Link>
              <p>{hotel['city']}</p>
              <p><b>Starting from ${hotel['cheapestPrice']}</b></p>
              <div>
                <span>{hotel['rating']}</span>
                <span>{hotel['type']}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ margin: '24px auto 24px auto', width: 1200 }}>
        <h3>No hotels </h3>
      </div>
    )
  }
}


export default ViewHotels;