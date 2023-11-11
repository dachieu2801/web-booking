import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Rooms() {

  const navigate = useNavigate()
  const [rooms, setRooms] = useState()
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()

  useEffect(() => {
    async function roomsHandle() {
      const data = await fetch(`http://localhost:5000/admin/rooms/${page}`)
      const roomsData = await data.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setRooms(roomsData.results)
        setTotalPage(roomsData.total_pages)
      }
    }
    roomsHandle()
  }, [page, rooms])

  async function deleteRooms(_id) {
    const confirm = window.confirm('Are you sure you want to delete this room?')
    if (confirm) {

      try {
        await fetch(`http://localhost:5000/admin/rooms/delete`, {
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

  if (rooms)


    return (
      <div>
        {rooms.length === 0 ? <h3 style={{ textAlign: 'center' }}>No Rooms</h3> :
          <div className="wrapper-broad">
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <span style={{ fontSize: '1.1rem' }} >Rooms List</span>
              <button
                onClick={() => navigate('/create-room')}
                style={{ color: 'green', border: '1px solid green', borderRadius: 5, cursor: 'pointer', }}
              >Add New</button>
            </div>
            <table className='table-transaction' style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <th><input type='checkbox' /></th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th>Action</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                  rooms.map((room, i) =>
                    <tr key={i}>
                      <td><input type='checkbox' /></td>
                      <td>{room._id}</td>
                      <td>{room.title}</td>
                      <td>{room.desc}</td>
                      <td>{room.price}</td>
                      <td>{room.maxPeople}</td>
                      <td><button
                        style={{ color: 'red', border: '1px dotted red', borderRadius: 5, cursor: 'pointer' }}
                        onClick={() => deleteRooms(room._id)}
                      >Delete</button></td>
                      <td><button
                        style={{ color: 'red', border: '1px dotted red', borderRadius: 5, cursor: 'pointer' }}
                        onClick={() => navigate(`/room/${room._id}`)}
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

export default Rooms