import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from '../url'

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState(false)
  const [login, setLogin] = useState(false)

  const [numberMess, setNumberMess] = useState('')
  const [emailMess, setEmailMess] = useState('')
  const [usernameMess, setUsernameMess] = useState('')

  if (login) {
    navigate('/login')
  }

  async function addUserHandle() {

    if (username.trim() && email.trim() && fullName.trim() && phoneNumber.trim() && email.trim()) {
      setErr(false)
      setNumberMess('')
      setEmailMess('')
      setUsernameMess('')
      const res = await fetch(`${URL}user/create-account`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          fullName,
          phoneNumber,
          email,
          isAdmin: false,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      console.log(data);
      if (data.message === 'oke') {
        setLogin(true)
      } else {
        setLogin(false)
        if (data.message.phoneNumber)
          setNumberMess(data.message.phoneNumber['message'])
        if (data.message.email)
          setEmailMess(data.message.email['message'])
        if (data.message.username)
          setUsernameMess(data.message.username)
      }
    } else {
      setErr(true)
    }
  }


  return (
    <div style={{ width: '300px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form method="POST" action="">
        <input
          type="text"
          placeholder="Username"
          name='username'
          style={{ width: '100%', margin: '10px 0 6px  0' }}
          onChange={(e) => setUsername(e.target.value.trim())}
        /><br />
        {
          usernameMess && <p style={{ color: 'orange', margin: '-6px 0 5px 0' }}>
            {usernameMess}
          </p>
        }

        <input
          type="password"
          placeholder="Password"
          name='password'
          style={{
            width: '100%',
            margin: '2px 0 8px  0'
          }}
          onChange={(e) => setPassword(e.target.value.trim())}

        /><br />

        <input
          type="text"

          placeholder="FullName"
          name='fullName'
          style={{
            width: '100%',
            margin: '2px 0 8px  0'
          }}
          onChange={(e) => setFullName(e.target.value.trim())}

        /><br />

        <input
          type="number"

          placeholder="PhoneNumber"
          name='phoneNumber'
          style={{
            width: '100%',
            margin: '2px 0 8px  0'
          }}
          onChange={(e) => setPhoneNumber(e.target.value)}
        /><br />
        {
          numberMess && <p style={{ color: 'orange', margin: '-6px 0 5px 0' }}>
            {numberMess}
          </p>
        }
        <input
          type="email"

          placeholder="Email"
          name='email'
          style={{
            width: '100%',
            margin: '2px 0 8px  0'
          }}
          onChange={(e) => setEmail(e.target.value.trim())}

        /><br />
        {
          emailMess && <p style={{ color: 'orange', margin: '-6px 0 5px 0' }}>
            {emailMess}
          </p>
        }
        {
          err && <p style={{ color: 'orange', margin: '-6px 0 5px 0' }}>
            Please enter full field
          </p>
        }
        <button
          type="submit"
          onClick={(e) => { e.preventDefault(); addUserHandle(); }}
          style={{
            width: '307px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            background: '#0d00c2',
            color: '#fff',
            padding: '8px 0'
          }}>Register</button>
      </form>
    </div>
  )
}

export default Register