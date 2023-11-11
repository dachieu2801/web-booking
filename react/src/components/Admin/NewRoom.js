import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"



function NewRoom() {
  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  const [maxPeople, setMaxPeople] = useState()
  const [roomNumbers, setRoomNumbers] = useState()
  const [err, setErr] = useState()
  const [hotel, setHotel] = useState()
  const [dataHotels, setDataHotels] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const data = await fetch(`http://localhost:5000/admin/hotels/1`)
      const roomsData = await data.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setDataHotels(roomsData.hotels)
      }
    }
    fetchApi()
  }, [])

  async function createHotel() {
    try {
      setErr('')
      if (title && desc && price && maxPeople && roomNumbers && hotel) {
        const res = await fetch(`http://localhost:5000/admin/rooms/create-room`, {
          method: 'post',
          body: JSON.stringify({
            room: {
              title,
              desc,
              price,
              maxPeople,
              roomNumbers
            },
            hotel
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.message === 'Has error') {
          throw new Error()
        } else {
          navigate('/rooms')
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


  console.log(hotel);
  return (
    <div>
      <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '8px 8px', margin: '18px 10px 8px 10px'}}>
        <p style={{ fontSize: '1.1rem' }}>Add New Room</p>
      </div>

      <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px' ,margin: '18px 10px 8px 10px', padding: '8px 40px' }}>
        <div className='wrapper-input'>
          {input('Title', 'text', setTitle, 'Title of the hotel')}
          {input('Description', 'text', setDesc, 'Description')}
          {input('Price', 'number', setPrice, 'Cheapest price')}
          {input('Max People', 'number', setMaxPeople, 'Max people')}
          {input('Rooms', 'text', setRoomNumbers, 'Give comma between room numbers')}
          <div>
            <label>Choose a hotel</label><br />
            <select onChange={(e) => setHotel(e.target.value)} >
              <option value=''>Choose a hotel</option>
              {dataHotels && dataHotels.map((hotel) => (
                <option
                  key={hotel._id}
                  value={hotel._id}
                >{hotel.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={createHotel}
          style={{ padding: '4px 24px', background: '#0073e6', color: '#fff', cursor: 'pointer' }}
        >Send</button>
        <span style={{ color: 'orange', marginLeft: 20 }}>{err}</span>
      </div>
    </div>
  )
}

export default NewRoom