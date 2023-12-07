import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import URL from '../../url'


function NewHotel() {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [type, setType] = useState()
  const [city, setCity] = useState()
  const [address, setAddress] = useState()
  const [distance, setDistance] = useState()
  const [title, setTitle] = useState()
  const [photos, setPhotos] = useState()
  const [desc, setDesc] = useState()
  const [featured, setFeatured] = useState('false')
  const [rooms, setRooms] = useState()
  const [cheapestPrice, setCheapestPrice] = useState()
  const [err, setErr] = useState()
  const [dataRoom, setDataRoom] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await fetch(`${URL}admin/rooms/1`)
      const roomsData = await data.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setDataRoom(roomsData.rooms)
      }
    }
    fetchApi()
  }, [])

  const handleOnClick = (id) => {
    if (rooms) {
      const index = rooms.findIndex(a => a === id)
      if (index === -1) {
        setRooms(prev => [...prev, id])
      } else {
        setRooms(prev => {
          const update = [...prev]
          update.splice(index, 1)
          return update
        })
      }
    } else {
      setRooms([id])
    }
  };

  const checkhanle = (id) => {
    if (rooms) {
      const exists = rooms.find(room => room === id)
      if (exists) {
        return true
      } else {
        return false
      }
    }
  }

  async function createHotel() {
    try {
      setErr('')
      if (name && type && city && address && distance && title && photos && desc && cheapestPrice) {
        const res = await fetch(`${URL}admin/hotels/create-hotel`, {
          method: 'post',
          body: JSON.stringify({
            name,
            type,
            city,
            address,
            distance,
            title,
            photos,
            desc,
            featured,
            rooms: rooms ? rooms.toString() : null,
            cheapestPrice
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        console.log(data);
        if (data.message === 'Has error') {
          throw new Error()
        } else {
          navigate('/hotels')
        }
      } else {
        setErr('Please enter all field')
      }
    } catch (err) {
      alert('Has error')
    }
  }
  const input = (name, type, setState, placeholder) => (
    <div>
      <label>{name}</label><br />
      <input
        type={type}
        onChange={(e) => setState(type === 'number' ? e.target.value : e.target.value.trim())}
        placeholder={placeholder} />
    </div>
  )
  if (dataRoom)
    return (
      <div>
        <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '8px 8px', margin: '18px 10px 8px 10px' }}>
          <p style={{ fontSize: '1.1rem' }}>Add New Hotel</p>
        </div>

        <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', margin: '18px 10px 8px 10px', padding: '8px 40px' }}>
          <div className='wrapper-input'>
            {input('Name', 'text', setName, 'Name of the hotel')}
            <div>
              <label >Type</label><br />
              <select onChange={(e) => setType(e.target.value)} style={{ marginTop: 8 }}>
                <option value='' >Choose a Type</option>
                <option value='hotel' >Hotel</option>
                <option value='apartments'>Apartments</option>
                <option value='resorts'>Resorts</option>
                <option value='villas'>Villas</option>
                <option value='cabins'>Cabins</option>
              </select>
            </div>
            {/* {input('Type', 'text', setType, 'Type of the hotel')} */}
            {input('City', 'text', setCity, 'City of the hotel')}
            {input('Address', 'text', setAddress, 'Address of the hotel')}
            {input('Distance from city center', 'number', setDistance, 'Distance from city center')}
            {input('Title', 'text', setTitle, 'Title of the hotel')}
            {input('Description', 'text', setDesc, 'Description')}
            {input('Price', 'number', setCheapestPrice, 'Cheapest price')}
            {input('Images', 'text', setPhotos, 'Give comma between link image')}
            <div>
              <label>Featured</label><br />
              <select onChange={(e) => setFeatured(e.target.value)}>
                <option value='false'>No </option>
                <option value='true'>Yes</option>
              </select>
            </div>

          </div>
          <label>Rooms</label><br />

          <div style={{ border: '1px solid #000', height: '100px', overflow: 'auto' }}>
            {dataRoom.map((room, i) => (
              <p
                style={{ color: checkhanle(room._id) ? 'orange' : 'black' }}
                key={room._id}
                onClick={() => {
                  handleOnClick(room._id)
                }}
                className="a"
              >{room.title}</p>
            ))}
          </div>
          <button
            onClick={(createHotel)}
            style={{ padding: '4px 24px', background: '#0073e6', color: '#fff', cursor: 'pointer', marginTop: 14 }}
          >Send</button>
          <span style={{ color: 'orange', marginLeft: 20 }}>{err}</span>
        </div>
      </div>
    )
}

export default NewHotel