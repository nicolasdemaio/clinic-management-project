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
    <div className='login-container'>
      <h1 className='login-title'>Clinic Management System</h1>

      <form onSubmit={handleLogin} className='login-form'>
        <div className='login-input-container'>
        <label for="lusername" className='login-label'>Usuario</label>
        <input type='text' name='lusername' required onChange={handleChange(setUsername)} className='login-field'/>
        </div>
        
        <div className='login-input-container'>
        <label for="lpassword" className='login-label'>Contraseña</label>
        <input type='password' name='lpassword' required onChange={handleChange(setPassword)} className='login-field'/>
        </div>
        <input type="submit" value="Ingresar" className='login-button'></input>
      </form>

      <button onClick={handleGetAppointments}>Traer Turnos</button>
    </div>
  )
}

export default LoginView