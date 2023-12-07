import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import URL from '../../url'

function Hotels() {

  const navigate = useNavigate()
  const [hotels, setHotels] = useState()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()

  useEffect(() => {
    async function hotelsHandle() {
      const data = await fetch(`${URL}admin/hotels/${page}`)
      const hotelsData = await data.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setHotels(hotelsData.results)
        setTotalPage(hotelsData.total_pages)

      }
    }
    hotelsHandle()

  }, [page, hotels])

  async function deleteHotels(_id) {
    const confirm = window.confirm('Are you sure you want to delete this hotel?')
    if (confirm) {

      try {
        await fetch(`${URL}admin/hotels/delete`, {
          method: 'DELETE',
          body: JSON.stringify({
            _id
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        alert('Successfully deleted')
      } catch (err) {
        alert('Has error')
      }
    }
  }



  if (hotels)
    return (
      <div>
        {hotels.length === 0 ? <h3 style={{ textAlign: 'center' }}>No Hotels</h3> :
          <div className="wrapper-broad">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <span style={{ fontSize: '1.1rem' }} >Hotels List</span>
              <button
                onClick={() => navigate('/create-hotel')}
                style={{ color: 'green', border: '1px solid green', borderRadius: 5, cursor: 'pointer', }}
              >Add New</button>
            </div>
            <table className='table-transaction' style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <th><input type='checkbox' /></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Action</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                  hotels.map((hotel, i) =>
                    <tr key={i}>
                      <td><input type='checkbox' /></td>
                      <td>{hotel._id}</td>
                      <td>{hotel.name}</td>
                      <td>{hotel.type}</td>
                      <td>{hotel.title}</td>
                      <td>{hotel.city}</td>
                      <td><button
                        style={{ color: 'red', border: '1px dotted red', borderRadius: 5, cursor: 'pointer' }}
                        onClick={() => deleteHotels(hotel._id)}
                      >Delete</button></td>
                      <td><button
                        style={{ color: 'red', border: '1px dotted red', borderRadius: 5, cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/hotels/${hotel._id}`)
                        }}
                      >Edit</button></td>
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

export default Hotels