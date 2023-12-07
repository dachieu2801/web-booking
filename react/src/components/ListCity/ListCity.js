import { useState, useEffect } from "react";
import URL from '../../url'

import './ListCity.css'
import { useNavigate } from "react-router-dom";
function ListCity() {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState()
  // const [hotels, setHotels] = useState()
  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(`${URL}hotel`)
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

  if (hotels) {
    let hanoiHotel
    let HCMHotel
    let danangHotel
    hanoiHotel = hotels.filter((a => a.city === 'Ha Noi'))

    HCMHotel = hotels.filter((a => a.city === 'Ho Chi Minh'))

    danangHotel = hotels.filter((a => a.city === 'Da Nang'))

    let listCity = [
      {
        "name": "Ha Noi",
        "subText": hanoiHotel.length,
        "image": "./images/Ha_Noi.jpg",
        "path": 'hanoi'
      },
      {
        "name": "Ho Chi Minh",
        "subText": HCMHotel.length,
        "image": "./images/HCM.jpg",
        "path": 'hochiminh'
      },
      {
        "name": "Da Nang",
        "subText": danangHotel.length,
        "image": "./images/Da_Nang.jpg",
        "path": 'danang'
      }
    ]
    return (
      <div className='listcity'>
        {listCity.map(city => (
          <div className='img-listcity' key={city['name']} style={{ background: `url(${city['image']}) center` }}
            onClick={() => navigate(`viewHotels?city=${city.path}`)}
          >
            <div className='infor-city'>
              <h1>{city['name']}</h1>
              <h2>{`${city['subText']} properties`}</h2>
            </div>
          </div>
        ))}
      </div>
    )
  }
}


export default ListCity;