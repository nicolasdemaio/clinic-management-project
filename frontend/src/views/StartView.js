import './StartView.css'
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../images/logo.png'

const StartView = () => {

  const [showMenu, setShowMenu] = useState(true);
  const [ultop, setUltop] = useState("160px");
  const [navState, setNavState] = useState(null);
  const [isLogged, setIsLogged] = useState(localStorage.getItem("authToken"));

  const navigate = useNavigate()
  
  const userLogged = localStorage.getItem("username");

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, []);
    
  const handleScroll = () => {
    window.pageYOffset > 100 ? setNavState("navShadow") : setNavState(null);
    window.pageYOffset > 100 ? setUltop('100px') : setUltop('160px');
  }

  const ToggleMenu = (event) => {
    setShowMenu(!showMenu);
    event.preventDefault();

    const reference = event.target.getAttribute('href')

    if (reference && reference.startsWith('#')){
      document.getElementById(reference.replace('#','')).scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }

  const buttonLogged = (event) => {
    event.preventDefault();

    if (!isLogged) {
      navigate('/login')
    }
  }

  const closeSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    setIsLogged('');
  }

  const PrivateAction = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <Fragment>
    <header className="mainstart">
        <nav className={navState}>
            <div id="brand">
                <img id="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} alt='logo' src={Logo}/>
                <div id="word-mark">NIRODS</div>
            </div>
            <div id="menu">
                <div id="menu-toggle" className={showMenu ? "showMenu" : "closeMenu"} onClick={ToggleMenu}>
                    <div id="menu-icon">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
                <ul className={showMenu ? "closeMenu" : "showMenu"} style={{ top : {ultop}}} >
                    <li onClick={ToggleMenu}><a href="#section00">Conocenos</a></li>
                    <li onClick={ToggleMenu}><a href="#section01">Cartilla medica</a></li>
                    <li onClick={ToggleMenu}><a href="#section02">Gestion</a></li>
                    <li onClick={ToggleMenu}><a href="#section03">Contacto</a></li>
                    <li className="logger" onClick={buttonLogged}> {isLogged? ( <>{userLogged} <ul><li onClick={PrivateAction}> Dashboard</li> <li onClick={closeSession}> Logout</li></ul></> ) : "Login"} </li>
                </ul>
            </div>
        </nav>
        <div id="hero-section">
            <div id="head-line"></div>
        </div>
    </header>
    <section id="section00">
        <div id="heading"></div>
    </section>
    <section id="section01">
        <div id="heading"></div>
    </section>
    <section id="section02">
        <div id="heading"></div>
    </section>
    <section id="section03">
        <div id="heading"></div>
    </section>
    </Fragment>
  )
}

export default StartView