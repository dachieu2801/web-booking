import { useNavigate, useParams } from 'react-router-dom';
import './ContentDetail.css'
import { useState, useEffect, useContext } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AuthContext } from '../../App';
import Room from './Room'
import URL from '../../url'

function ContentDetail() {
  const navigate = useNavigate()
  const [user] = useContext(AuthContext)
  const { _id } = useParams()
  const [detailHotels, setDetailHotels] = useState()
  const [book, setBook] = useState(false)
  const [fullName, setFullName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [cardNumber, setCardNumber] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [typePayment, setTypePayment] = useState()
  const [roomData, setRoomData] = useState()
  const [room, setRoom] = useState([])
  const [err, setErr] = useState('')
  //date
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  let dateStart = dateRange[0].startDate.toString()
  let dateEnd = dateRange[0].endDate.toString()

  //api
  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(`${URL}hotel/${_id}`)
        const data = await res.json()
        // console.log(data);
        if (data.message) {
          throw new Error('Failed to fetch')
        } else {
          setDetailHotels(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi()
  }, [])

  //lấy phòng còn chonogs trong khoảng time
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    async function fetchRoom() {
      const res = await fetch('${URL}hotel/room', {
        method: 'POST',
        body: JSON.stringify({
          dateStart,
          dateEnd,
          _id
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      setRoomData(data.rooms)
      /// set bolean cho cácc phòng
      let roomNumber = []

      data.rooms.forEach(room => {
        if (room.roomNumbers) {
          roomNumber = [...roomNumber, new Array(room.roomNumbers.length).fill(false)]
        }
      })
      setChecked(roomNumber)

    }
    fetchRoom()

  }, [dateRange])

  // lấy các phong đã  chọn
  useEffect(() => {
    let room = []
    let total = 0
    if (detailHotels) {
      roomData.forEach((a, index) => {
        a.roomNumbers.forEach((b, i) => {
          if (checked[index][i]) {
            total += a.price
            room.push(b)
          }
        })
      })
    }
    setRoom(room)
    setTotalPrice(total)
  }, [checked])
  /////////////////////////////////////////

  const input = (place, state, setState, type = 'text') => {
    return (
      <>
        <p><label>Your {place}</label></p>
        <input
          type={type}
          placeholder={place}
          value={state}
          onChange={(e) => setState(e.target.value.trim())}
        /><br />
      </>
    )
  }


  async function transactionHandle() {

    if (fullName.trim() && email.trim() && phoneNumber && cardNumber && room.length > 0 && typePayment) {
      setErr('')
      const res = await fetch('${URL}transaction', {
        method: 'POST',
        body: JSON.stringify({
          user: user.username,
          hotel: _id,
          nameHotel: detailHotels.hotel.name,
          room,
          dateStart,
          dateEnd,
          price: totalPrice,
          payment: typePayment,
          status: 'Booked',
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      // console.log(data);
      if (data.message === 'oke')
        navigate('/transactions')

    } else {
      if (room.length === 0) {
        setErr('Please choose at least one room')
      } else if (!typePayment) {
        setErr('Please select payment method')
      } else {
        setErr('Please enter all field')
      }
    }
  }

  if (detailHotels && roomData)
    return (
      <>
        <div className='container-ContentDetail'>
          <div className='section-f-ContentDetail'>
            <div>
              <h2>{detailHotels.hotel['name']}</h2>
              <p><i className='fa fa-map-marker'></i> {detailHotels.hotel['address']}</p>
              <p style={{ fontSize: '1rem', color: '#0099ff' }}>{`Excellent location - ${detailHotels.hotel['distance']}m from center`} </p>
              <p style={{ fontSize: '1rem', color: ' rgb(5, 144, 26)' }}>{`Book a stay over $${detailHotels.hotel['cheapestPrice']} at this property and get a free airport taxi`} </p>
            </div>
            <div>
              <button type='button'>Reserve or Book Now!  </button>
            </div>
          </div>
          <div className='section-photos-ContentDetail'>
            {detailHotels.hotel['photos'].map((photo, i) => (
              <img key={i} src={photo} width='100%' />
            ))}
          </div>
          <div className='section-e-ContentDetail'>
            <div>
              <h2>{detailHotels.hotel['title']}</h2>
              <p>{detailHotels.hotel['desc']}</p>
            </div>
            <div className='inner-section-e-ContentDetail'>
              <p className='number-night-stay'>Perfect for a 1-night stay!</p>
              <p>Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with</p>
              <p className='price-ContentDetail'><b>${detailHotels.hotel['cheapestPrice']}</b> (1 nights)</p>
              <button type='button' onClick={() => setBook(!book)}>Reserve or Book Now!</button>
            </div>
          </div>
        </div >

        {book &&
          <>
            <div className='wrapper-reserve'>
              <div >
                <h2 style={{ marginBottom: 8 }}>Dates</h2>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
              <div className='input-reserve'>
                <h2 style={{ marginBottom: 8 }}>Reserve Info</h2>


                {input('Full Name', fullName, setFullName)}

                {input('Email', email, setEmail)}

                {input('Phone Number', phoneNumber, setPhoneNumber, 'number')}

                {input('Card Number', cardNumber, setCardNumber, 'number')}

              </div>
            </div >
            <div>
              <h2 style={{ marginBottom: 16 }}>Select Rooms</h2>
              <div className='wrapper-select-room'>
                {
                  roomData.map((room, i) => (
                    <div key={i}>
                      <Room room={room} checkState={[checked, setChecked]} i={i} id={_id} />
                    </div>
                  ))
                }
              </div>
            </div>
            <div>
              <h2 style={{ margin: '30px 0 10px 0' }}>Total Bill: ${totalPrice}</h2>

              <select className='payment' onChange={(e) => setTypePayment(e.target.value)}>
                <option value='' >Select Payment Method</option>
                <option value='credit_card' >Credit Card</option>
                <option value='cash' >Cash</option>
              </select>
              <button className='btn' onClick={transactionHandle}>Reserve Now</button>
              {err && <span style={{ color: 'orange' }}>{err}</span>}
            </div>
          </>
        }

      </>

    )
}

export default ContentDetail


