

import { useNavigate } from 'react-router-dom'
import './SearchListItem.css'

function SearchListItem(props) {
  const navigate = useNavigate()
  let item = props.items
  return (
    <div className='container-SearchListItem'>
      <img src={item.photos[0]} alt={item['name']} width='100%' height='100%' />
      <div>
        <h2>{item['name']}</h2>
        <p><b>Distance</b>: {item['distance']}m from center</p>
        <p><b>Description</b>: {item['desc'].slice(0, 100)} ...</p>
        <p><b>Type</b>: {item['type'].charAt(0).toUpperCase() + item['type'].slice(1)}</p>
      </div>
      <div>
        <div className='rate-SearchListItem'>
          <h4>Rate:</h4>
          <p style={{ padding: '0 10px' }} >{item['rating']}</p>
        </div>
        <h3>${item['cheapestPrice']}</h3>
        <p style={{ opacity: '0.6', fontSize: '0.8rem', textAlign: 'end' }}>Includes taxes and fees</p>
        <button onClick={() => navigate(`/detail/${item._id}`)} type='button'>See availability</button>
      </div>
    </div >
  )
}

export default SearchListItem
