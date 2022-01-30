import './LogOutButton.css'
import { useNavigate } from 'react-router-dom'

const LogOutButton = (props) => {

    const navigate = useNavigate()

    const handleLogout = async (event) => {
        event.preventDefault()
        localStorage.clear()    
        navigate('/login')
        // localStorage.removeItem('item') de a uno
    }

    return (
        <button className='logout-button' onClick={handleLogout}>Log Out</button>
    )
}

export default LogOutButton