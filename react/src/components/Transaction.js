import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../App"
function Login() {

  const [user] = useContext(AuthContext)

  const [data, setData] = useState()

  useEffect(() => {
    async function transactionHandle() {
      const res = await fetch(`http://localhost:5000/transaction/${user.username}`)

      const data = await res.json()
      if (data.message === 'Has error') {
      } else {
        setData(data)
      }
    }
    transactionHandle()

  }, [])

  const dateHandle = (data) => {
    const start = new Date(data.dateStart)
    const end = new Date(data.dateEnd)
    const results = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`
    return results
  }

  if (data)
    return (
      <div style={{ width: '1200px', margin: '20px auto' }}>
        <h2 style={{ marginBottom: 6 }}>Your Transactions</h2>
        {data.length === 0 ? <h3 style={{ textAlign: 'center' }}>You have no transaction</h3> :

          <table className='table-transaction'>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((a, i) =>
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{a.nameHotel}</td>
                    <td>{a.room.join(', ')}</td>
                    <td>{dateHandle(a)}</td>
                    <td>${a.price}</td>
                    <td>{a.payment}</td>
                    <td><span
                      style={{
                        backgroundColor:
                          a.status === 'Booked' ?
                            '#ff8080' : a.status === 'Checkin' ? '#39e600' : '#d9b3ff'
                      }}
                      className="status-transaction">{a.status}</span> </td>
                  </tr>
                )
              }

            </tbody>
          </table>
        }
      </div>
    )
  else
    return (
      <div style={{ width: '1200px', margin: '20px auto' }}>

        <h2 style={{ marginBottom: 6 }}>Your Transactions</h2>

        <p> You have nothing</p>
      </div>
    )
}

export default Login