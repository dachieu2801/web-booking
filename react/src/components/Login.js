import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App"
function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function loginHandle() {
    setErr('')
    if (username.trim() && password.trim()) {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      if (data.isLogin === false) {
        setErr('Username or password incorrect')
      } else {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/')
      }
    } else {
      setErr('Please enter username and password')
    }
  }

  return (
    <div style={{ width: '300px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username" name='username' style={{ width: '100%', margin: '10px 0 6px  0' }} /><br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" name='password' style={{ width: '100%', margin: '2px 0 8px  0' }} /><br />

        {err && <p style={{ color: 'orange', margin: '-6px 0 5px 0' }}>{err}</p>}
        <button type="submit"
          onClick={(e) => { e.preventDefault(); loginHandle() }}
          style={{
            width: '307px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            background: '#0d00c2',
            color: '#fff',
            padding: '8px 0'
          }}>Login</button>
      </form>
    </div>
  )
}

export default Login