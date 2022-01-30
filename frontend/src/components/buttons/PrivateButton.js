import './PrivateButton.css'
import { useNavigate } from 'react-router-dom'

const PrivateButton = (props) => {

    const navigate = useNavigate()

    const handlePrivate = async (event) => {
        event.preventDefault() 
        navigate('/home')
    }

    return (
        <button className='private-button' onClick={handlePrivate}>Cosas admin</button>
    )
}

export default PrivateButton