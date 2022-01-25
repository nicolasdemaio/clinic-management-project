import './LoginView.css'
import React, {useState} from 'react'
import { useLocalStorage } from '../services/useLocalStorage'

const LoginView = () => {

  const [username, setUsername] = useLocalStorage('username', '')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    // event.preventDefault()

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
      <input type='text' name='username' required onChange={handleChange(setUsername)}/>

      <input type='password' name='password' required onChange={handleChange(setPassword)}/>

      <button onClick={handleLogin}>Log In</button>

      <p>Username : {username}</p>
      <p>Password : {password}</p>
    </>
  )
}

export default LoginView