
import { useState, useEffect } from "react";

function ContentDetail(props) {
  const room = props.room
  const indexRooms = props.i
  const [checked, setChecked] = props.checkState

  const handleOnChange = (position) => {
    const updatedCheckedState = checked[indexRooms].map((item, index) =>
      index === position ? !item : item
    );
    setChecked(prev => {
      const update = [...prev]
      update.splice(indexRooms, 1, updatedCheckedState)
      return update
    });
  }


  return (
    <div className="wrapper-content-room">
      <div>
        <h4 >{room.title}</h4>
        <p>{room.desc}</p>
        <p>Max people: <b>{room.maxPeople}</b></p>
        <p><b>${room.price}</b></p>
      </div>
      <div className='checkbox-room'>
        {
          room.roomNumbers.length > 0 &&
          room.roomNumbers.map((a, i) =>
            <div key={i} style={{ textAlign: 'center' }}>
              <label htmlFor={a}>{a}</label><br />
              <input
                type="checkbox"
                checked={checked[indexRooms][i]}
                onChange={() => handleOnChange(i)}
              />
            </div>)
        }
      </div>
    </div>
  )
}

export default ContentDetail


