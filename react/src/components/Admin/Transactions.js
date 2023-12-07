import { useState, useEffect } from "react"
import URL from '../../url'

function Transactions() {

  const [inforBroad, setInforBroad] = useState()
  const [transactions, setTransactions] = useState()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()

  useEffect(() => {
    async function transactionHandle() {
      const res = await fetch(`${URL}admin`)
      const transactionRes = await fetch(`${URL}admin/transaction/${page}`)
      const data = await res.json()
      const transactionData = await transactionRes.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setInforBroad(data)
        setTransactions(transactionData.data.results)
        setTotalPage(transactionData.data.total_pages)
      }
    }
    transactionHandle()

  }, [page])
  const dateHandle = (data) => {
    const start = new Date(data.dateStart)
    const end = new Date(data.dateEnd)
    const results = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`
    return results
  }
  if (inforBroad && transactions)
    return (
      <div>
        {transactions.length === 0 ? <h3 style={{ textAlign: 'center' }}>No transaction</h3> :
          <div className="wrapper-broad">
            <p style={{ fontSize: '1.1rem', marginBottom: 12 }} >Lastest Transactions</p>

            <table className='table-transaction'>
              <thead>
                <tr>
                  <th><input type='checkbox' /></th>
                  <th>ID</th>
                  <th>User</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  transactions.map((transaction, i) =>
                    <tr key={i}>
                      <td><input type='checkbox' /></td>
                      <td>{transaction._id}</td>
                      <td>{transaction.user}</td>
                      <td>{transaction.nameHotel}</td>
                      <td>{transaction.room.join(', ')}</td>
                      <td>{dateHandle(transaction)}</td>
                      <td>${transaction.price}</td>
                      <td>{transaction.payment}</td>
                      <td><span
                        style={{
                          backgroundColor:
                            transaction.status === 'Booked' ?
                              '#ff8080' : transaction.status === 'Checkin' ? '#39e600' : '#d9b3ff'
                        }}
                        className="status-transaction">{transaction.status}</span> </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <div className='wraperPage'>
              <span >Page: {page}/{totalPage}</span>
              <p onClick={e => page === 1 ? null : setPage(page - 1)} style={{ color: page === 1 ? '#a6a5a5' : '#000' }} >{'<'}</p>
              <p onClick={e => page === totalPage ? null : setPage(page + 1)} style={{ color: page === totalPage ? '#a6a5a5' : '#000' }}>{'>'}</p>
            </div >
          </div>
        }
      </div>
    )
}

export default Transactions