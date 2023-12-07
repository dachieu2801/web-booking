import React, { useState, useEffect } from "react";
import './TypeHotels.css'
import { useNavigate } from "react-router-dom";
import URL from '../../url'

function TypeHotels() {
  const navigate = useNavigate()

  const [hotels, setHotels] = useState()

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(`${URL}hotel`)
        const data = await res.json()
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
  if (hotels) {

    const typeHotels = [
      {
        "name": "Hotels",
        "count": hotels.length,
        "image": "./images/type_1.webp",
        "path": 'hotel'
      },
      {
        "name": "Apartments",
        "count": 0,
        "image": "./images/type_2.jpg",
        "path": 'apartments'
      },
      {
        "name": "Resorts",
        "count": 0,
        "image": "./images/type_3.jpg",
        "path": 'resorts'
      },
      {
        "name": "Villas",
        "count": 0,
        "image": "./images/type_4.jpg",
        "path": 'villas'
      },
      {
        "name": "Cabins",
        "count": 0,
        "image": "./images/type_5.jpg",
        "path": 'cabins'
      }
    ]
    return (
      <div>
        <h3>Browse by property type</h3>
        <div className='container-typehotels'>
          {typeHotels.map(type => (
            <div className='' key={type['name']}
              onClick={() => navigate(`/viewHotels?type=${type['path']}`)}
            >
              <img src={type['image']} alt={type['name']} width='100%' height='60%' />
              <h4>{type['name']}</h4>
              <div style={{ fontSize: '0.91rem' }}>{`${type['count']} ${type.name}`}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default TypeHotels