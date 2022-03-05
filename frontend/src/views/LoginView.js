import './LoginView.css'
import React, {useRef, useState, useEffect} from 'react'
import useAuth from "../hooks/useAuth"
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import { Button } from '@mui/material'
import BackDropLoading from '../components/BackdropLoading'

const LOGIN_URL = 'api/login'

const LoginView = () => {

  const [showBackdrop, setShowBackdrop] = useState(false)
  const handleBackdrop = () => {
    setShowBackdrop(true)
    setTimeout(() => setShowBackdrop(false), 1000)
  }

  const { setAuth } = useAuth()
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  
  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password]) //Actua si cambia el user o pass

  const handleLogin = async (event) => {
    event.preventDefault()
    handleBackdrop()
    
    axios.post(LOGIN_URL, { username, password },{
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    })
    .then(response => {
      const accessToken = response.headers['authorization']
      const roles = response.data['roles']

      localStorage.setItem('userData', JSON.stringify(response.data))
      localStorage.setItem('authToken', accessToken)
      localStorage.setItem('roles', roles)
      localStorage.setItem('username', username)

      setAuth({username, password, roles, accessToken})
      navigate(from, { replace: true })
    })
    .catch(e => {
        console.log(e)
        if (!e?.response){
          setErrMsg('No server response')
        } else if (e.response?.status === 400) {
          setErrMsg('Missing username or password')
        } else if (e.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else {
          setErrMsg('Loggin failed')
        }
        errRef.current.focus()
    })
  }

  const handleChange = (setValue) => {
    return (event) => setValue(event.target.value)
  }

  const gotoStartView = () => {
    navigate('/')
  }

  return (
    // className={this.state.animationClass}
    <div className='login-container'>
      <p ref={errRef} className={errMsg ? "errmsg" :
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className='login-title'>Clinic Management System</h1>

      <form className='login-form'>
        <div className='login-input-container'>
        <label htmlFor="lusername" className='login-label'>Usuario</label>
        <input type='text' id='lusername' required ref={userRef} value={username} onChange={handleChange(setUsername)} className='login-field'/>
        </div>
        
        <div className='login-input-container'>
        <label htmlFor="lpassword" className='login-label'>Contraseña</label>
        <input type='password' id='lpassword' required value={password} onChange={handleChange(setPassword)} className='login-field'/>
        </div>
      </form>
      <div className='login-buttons'>
        <Button style={{margin: '2px'}} type='submit' variant="contained" color='primary' onClick={handleLogin}>Iniciar sesión</Button>
        <Button style={{margin: '2px'}} variant="contained" color='success' onClick={gotoStartView}>Ir al inicio</Button>
      </div>
      
      {showBackdrop ?
        <BackDropLoading/> : null
      }
    
    </div>
  )
}

export default LoginView