import './StartView.css'
import PrivateButton from '../components/buttons/PrivateButton'
import LogOutButton from '../components/buttons/LogOutButton'
import LogInButton from '../components/buttons/LogInButton'

const StartView = () => {

  return (
    <div className='start-container'>
      <PrivateButton />
      <LogInButton />
      <LogOutButton />
    </div>
  )
}

export default StartView