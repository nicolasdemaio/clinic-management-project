import './LoginView.css'
import React, {useState} from 'react'
import { useLocalStorage } from '../services/useLocalStorage'

const LoginView = () => {

  const [username, setUsername] = useLocalStorage('username', '')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    // try {
    //   const user = await loginService.login({username, password})
    //   setUser(user)
    //   setUsername('')
    //   setPassword('')
    // } catch (error) {
    //   console.error(error)
    // }
    
  }

  const handleChange = (setValue) => {
    return (event) => setValue(event.target.value)
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

      <p>Username : {username}</p>
      <p>Password : {password}</p>
    </>
  )
}

export default LoginView