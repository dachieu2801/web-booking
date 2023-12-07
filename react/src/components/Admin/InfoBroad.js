import { useState, useEffect } from "react"

import Transactions from './Transactions'
import URL from '../../url'

function InfoBroad() {

  const [inforBroad, setInforBroad] = useState()

  useEffect(() => {
    async function transactionHandle() {
      const res = await fetch(`${URL}admin`)
      const data = await res.json()
      if (data.message === 'Has error') {
        console.log('err');
      } else {
        setInforBroad(data)
      }
    }
    transactionHandle()
  }, [inforBroad])

  const styleHandle = { boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '10px 8px', borderRadius: 8 }
  if (inforBroad)
    return (
      <div>
        <div className="info-broad">
          <div style={styleHandle}>
            <p>USERS</p>
            <p style={{ fontSize: '1.3rem', margin: '8px 0 4px 0' }}>{inforBroad.noUser}</p>
            <div style={{ textAlign: 'end' }}>
              <i className="fa fa-user" style={{ padding: '4px 6px', borderRadius: 4, background: '#ffb3b3', color: '#ff3333' }}></i>
            </div>
          </div>
          <div style={styleHandle}>
            <p>ORDER</p>
            <p style={{ fontSize: '1.3rem', margin: '8px 0 4px 0' }}>{inforBroad.noTransaction}</p>
            <div style={{ textAlign: 'end' }}>
              <i className="fa fa-shopping-cart" style={{ padding: '4px 6px', borderRadius: 4, background: '#ffe0b3', color: '#ff9900' }}></i>
            </div>
          </div>
          <div style={styleHandle}>
            <p>EARNINGS</p>
            <p style={{ fontSize: '1.3rem', margin: '8px 0 4px 0' }}>$ {inforBroad.revenue}</p>
            <div style={{ textAlign: 'end' }}>
              <span style={{ padding: '4px 6px', background: '#79ff4d', borderRadius: 4, }}>
                <i className="fa fa-usd" style={{ color: '#00b300', border: '2px solid #00b300', borderRadius: '50%', height: 14, width: 14, textAlign: 'center' }}></i>
              </span>
            </div>
          </div>
          <div style={styleHandle}>
            <p>BALANCE</p>
            <p style={{ fontSize: '1.3rem', margin: '8px 0 4px 0' }}>$ {inforBroad.balance}</p>
            <div style={{ textAlign: 'end' }}>
              <i className="fa fa fa-calculator" style={{ padding: '4px 6px', borderRadius: 4, background: '#e699ff', color: '#ac00e6' }}></i>
            </div>
          </div>
        </div>

        <Transactions />
      </div>
    )
}

export default InfoBroad