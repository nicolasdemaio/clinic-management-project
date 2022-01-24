import './LoginView.css'
import React, {useState} from 'react'

const LoginView = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    
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