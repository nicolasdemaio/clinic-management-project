import './LoginView.css'
import React, {useState} from 'react'
import axios from 'axios';

const LoginView = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    axios.post('http://localhost:5000/api/login', {
      username,
      password
    })
    .then(response => {
      localStorage.setItem('token', response.headers['authorization'])
    })
    .catch(e => {
        console.log(e)
    })
  }

  const handleChange = (setValue) => {
    return (event) => setValue(event.target.value)
  }

  const handleGetAppointments = () => {
    axios.get('http://localhost:5000/api/appointments')
    .then(response => {
      console.log(response.data.data[0])
    })
    .catch(e => {
        console.log(e)
    })
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label for="lusername">Usuario
        <input type='text' name='lusername' required onChange={handleChange(setUsername)}/>
        </label>
        <label for="lpassword">Contraseña
        <input type='password' name='lpassword' required onChange={handleChange(setPassword)}/>
        </label>
        <input type="submit" value="Ingresar"></input>
      </form>

      <button onClick={handleGetAppointments}>Traer Turnos</button>

      <p>Username : {username}</p>
      <p>Password : {password}</p>
    </>
  )
}

export default LoginView