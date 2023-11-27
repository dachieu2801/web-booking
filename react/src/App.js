import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import React, { useState } from 'react'
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./components/Login";
import Register from './components/Register';
import NavBar from "./components/NavBar/NavBar";
import Transaction from "./components/Transaction";
import InfoBroad from "./components/Admin/InfoBroad";
import Hotels from "./components/Admin/Hotels";
import NewHotel from "./components/Admin/NewHotel";
import Rooms from "./components/Admin/Rooms";
import NewRoom from "./components/Admin/NewRoom";
import Transactions from './components/Admin/Transactions';
import EditHotel from "./components/Admin/EditHotel"
import EditRoom from "./components/Admin/EditRoom";
import ViewHotels from "./components/ViewHotels"

import './components/Admin/admin.css'
export const AuthContext = React.createContext()
export const SearchContext = React.createContext()
export const DateRange1 = React.createContext()
export const DataSearch = React.createContext()

function App() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const [search, setSearch] = useState({
    position: '',
    dateStart: '',
    dateEnd: '',
    minPrice: '',
    maxPrice: '',
    aduilt: '',
    children: '',
    room: '',
  })

  console.log(search);
  const [dataSearch, setDataSearch] = useState()

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const a = () => {
    localStorage.removeItem('user')
    setUser('')
  }

  if (user && user.isAdmin) {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={[user, setUser]}>
          <div className="wrapper-admin">
            <h2 style={{ textAlign: 'center' }}>Admin Page</h2>
            <div style={{ borderBottom: '2px solid #ccc' }}></div>
            <div className="nav-admin">
              <p>LISTS</p>
              <NavLink to='/'><i className="	fa fa-th-list"></i>Dashbroad</NavLink>
              <p>MAIN</p>
              <NavLink to='/users'><i className="	fa fa-user-o"></i>Users</NavLink><br />
              <NavLink to='/hotels'><i className="fa fa-home"></i>Hotels</NavLink><br />
              <NavLink to='/rooms'><i className="fa fa-calendar-o"></i>Rooms</NavLink><br />
              <NavLink to='/transaction'><i className="	fa fa-handshake-o"></i>Transactions</NavLink><br />
              <p>NEW</p>
              <NavLink to='create-hotel'><i className="fa fa-home"></i>New Hotel</NavLink><br />
              <NavLink to='create-room'><i className="fa fa-calendar-o"></i>New Room</NavLink><br />
              <p>USER</p>
              <NavLink style={{ color: 'black' }} to='/' onClick={a}><i className="fa fa-sign-out"></i>Logout</NavLink><br />
            </div>
            <Routes className=''>
              <Route path="/" element={<InfoBroad />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/create-hotel" element={<NewHotel />} />
              <Route path="/hotels/:id" element={<EditHotel />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/create-room" element={<NewRoom />} />
              <Route path="/room/:id" element={<EditRoom />} />
              <Route path="/transaction" element={<Transactions />} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </BrowserRouter >

    )
  }



  return (
    <BrowserRouter>
      <AuthContext.Provider value={[user, setUser]}>
        <SearchContext.Provider value={[search, setSearch]}>
          <DateRange1.Provider value={[dateRange, setDateRange]}>
            <DataSearch.Provider value={[dataSearch, setDataSearch]}>

              < div className='section-nav1' >
                <NavLink to='/' style={{ color: '#fff', textDecoration: 'none' }} >
                  Booking Website
                </NavLink>
                <div>
                  {user && <span style={{ marginRight: '14px' }}>{user.fullName}</span>}
                  <NavLink to={user ? '/transactions' : '/register'}
                    style={{ color: '#fff', textDecoration: 'none', marginRight: '14px' }}
                  >{user ? 'Transactions' : 'Register'}
                  </NavLink>
                  <NavLink to={user ? '/' : '/login'} style={{ color: '#fff', textDecoration: 'none' }}
                    onClick={() => user ? a() : null}
                  >{user ? 'Logout' : 'Login'}
                  </NavLink>
                </div >
              </div >
              <div className='container-navbar' >
                <div className='container color-while '>
                  <NavBar />
                </div>
              </div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {!user &&
                  <Route path="/" element={<Login />} />
                }
                {user &&
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/viewhotels" element={<ViewHotels />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/detail/:_id" element={<Detail />} />
                    <Route path='/transactions' element={<Transaction />} />
                  </>
                }
              </Routes>
            </DataSearch.Provider>
          </DateRange1.Provider >
        </SearchContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter >
  );
}

export default App;
