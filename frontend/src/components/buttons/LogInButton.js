import './LogInButton.css'
import { useNavigate } from 'react-router-dom'

const LogInButton = (props) => {

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()  
        navigate('/login')
        // localStorage.removeItem('item') de a uno
    }

    return (
        <button className='login-button' onClick={handleLogin}>Log in</button>
    )
}

export default LogInButton