import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"



function EditRoom() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState()

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  const [maxPeople, setMaxPeople] = useState()
  const [roomNumbers, setRoomNumbers] = useState()
  const [err, setErr] = useState()


  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(`http://localhost:5000/admin/rooms/edit/${id}`)
      const data = await res.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setData(data.room)
        setTitle(data.room.title)
        setDesc(data.room.desc)
        setPrice(data.room.price)
        setMaxPeople(data.room.maxPeople)
        setRoomNumbers(data.room.roomNumbers)
      }
    }
    fetchApi()
  }, [])
  async function editRoom() {
    try {
      setErr('')
      if (title && desc && price && maxPeople && roomNumbers) {
        const res = await fetch(`http://localhost:5000/admin/rooms/edit`, {
          method: 'put',
          body: JSON.stringify({
            _id: id,
            title,
            desc,
            price,
            maxPeople,
            roomNumbers
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
  const input = (name, type, setState, placeholder, state) => (
    <div>
      <label>{name}</label><br />
      <input
        value={state}
        type={type}
        onChange={(e) => setState(type === 'number' ? e.target.value : e.target.value.trim())}
        placeholder={placeholder} />
    </div>
  )

  if (data)
    return (
      <div>
        <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '8px 8px', margin: '18px 10px 8px 10px' }}>
          <p style={{ fontSize: '1.1rem' }}>Add New Room</p>
        </div>

        <div style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', margin: '18px 10px 8px 10px', padding: '8px 40px' }}>
          <div className='wrapper-input'>
            {input('Title', 'text', setTitle, 'Title of the hotel', title)}
            {input('Description', 'text', setDesc, 'Description', desc)}
            {input('Price', 'number', setPrice, 'Cheapest price', price)}
            {input('Max People', 'number', setMaxPeople, 'Max people', maxPeople)}
            {input('Rooms', 'text', setRoomNumbers, 'Give comma between room numbers', roomNumbers)}
          </div>
          <button
            onClick={editRoom}
            style={{ padding: '4px 24px', background: '#0073e6', color: '#fff', cursor: 'pointer' }}
          >Send</button>
          <span style={{ color: 'orange', marginLeft: 20 }}>{err}</span>
        </div>
      </div>
    )
}

export default EditRoom