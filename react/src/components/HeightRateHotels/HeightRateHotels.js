import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ListHotels.css'



// "name": "Aparthotel Stare Miasto",
// "city": "Madrid",
// "price": 120,
// "rate": 8.9,
// "type": "Excellent",
// "image_url": "./images/hotel_1.webp"


function HeightRateHotels() {
  const [rateHotels, setRateHotels] = useState()
  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch('http://localhost:5000/hotel/height_rate')
        const data = await res.json()
        if (data.message) {
          throw new Error(data.message)
        } else {
          setRateHotels(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi()
  }, [])
  if (rateHotels) {
    return (
      <div>
        <h3>Home guests love</h3>
        <div className='container-listhotels'>
          {rateHotels.map(hotels => (
            <div className='' key={hotels['name']}>
              <img src={hotels['photos'][0]} alt={hotels['name']} width='100%' height='300px' />
              <Link to={`/detail/${hotels._id}`}><b>{hotels['name']}</b></Link>
              <p>{hotels['city']}</p>
              <p><b>Starting from ${hotels['cheapestPrice']}</b></p>
              <div>
                <span>{hotels['rating']}</span>
                <span>{hotels['type']}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default HeightRateHotels