import { useState, useContext, useEffect } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SearchContext } from "../../App";
import { DateRange1 } from "../../App";
import './DateRange.css'

function DateRanges(props) {
  const [search, setSearch] = useContext(SearchContext)
  const [dateRange, setDateRange] = useContext(DateRange1)

  const [isSalender, setIsSalender] = useState(false)


  const handleSelect = (date) => {
    setDateRange([date.selection])
  }

  const handleClick = () => {
    setIsSalender(isSalender => !isSalender)
  }

  let startDate = dateRange[0].startDate
  let endDate = dateRange[0].endDate

  const dateHandle = (dateStart, dateEnd) => {
    const start = `${dateStart.getMonth() + 1}/${dateStart.getDate()}/${dateStart.getFullYear()}`
    const end = `${dateEnd.getMonth() + 1}/${dateEnd.getDate()}/${dateEnd.getFullYear()}`
    return `${start} to ${end}`
  }


  useEffect(() => {
    // if (setDate) {
    //   setDate({
    //     startDate, endDate
    //   })
    setSearch(prev => {
      const update = { ...prev }
      update.dateStart = startDate
      update.dateEnd = endDate
      return update
    })
    // }
  }, [dateRange])
  return (
    <div style={{ position: 'relative' }} >
      {props.icon && <i className='fa fa-calendar'></i>}
      <input
        onClick={handleClick}
        className='input-dateRange'
        style={{ height: props.height, paddingLeft: '6px' }}
        readOnly
        size={props.size}
        value={dateHandle(startDate, endDate)}
      />
      {
        isSalender &&
        <div className='dateRange'>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            onChange={handleSelect}
            ranges={dateRange}
          />
        </div>
      }
    </div>
  )
}

export default DateRanges

