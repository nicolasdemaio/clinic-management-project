import './LoginView.css';
import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Button } from '@mui/material';
import BackDropLoading from '../../components/BackdropLoading';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const LOGIN_URL = 'api/login';

const LoginView = () => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const handleBackdrop = () => {
    setShowBackdrop(true);
    setTimeout(() => setShowBackdrop(false), 1000);
  };

  const { setAuth } = useAuth();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [username, password]); //Actua si cambia el user o pass

  const handleLogin = async (event) => {
    event.preventDefault();
    handleBackdrop();

    axios
      .post(
        LOGIN_URL,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((response) => {
        const accessToken = response.headers['authorization'];
        const roles = response.data['roles'];

        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('roles', roles);
        localStorage.setItem('username', username);

        setAuth({ username, password, roles, accessToken });
        navigate('/dashboard/home', { replace: true });
      })
      .catch((e) => {
        console.log(e);
        if (!e?.response) {
          setErrMsg('No server response');
        } else if (e.response?.status === 400) {
          setErrMsg('Missing username or password');
        } else if (e.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Loggin failed');
        }
        errRef.current.focus();
      });
  };

  const handleChange = (setValue) => {
    return (event) => setValue(event.target.value);
  };

  const gotoHome = () => {
    navigate('/');
  };

  return (
    // className={this.state.animationClass}
    <div className='login-containerx'>
      <div className='login-box-container'>
        <p className='login-titlex'>CMS</p>
        <p className='login-subtitlex'>Inicia sesión para continuar</p>

        <form onSubmit={handleLogin} className='login-formx'>
          <label className='login-labelx'>Usuario:</label>
          <input
            type='text'
            value={username}
            onChange={handleChange(setUsername)}
            className='login-inputx'
          />
          <label className='login-labelx'>Contraseña:</label>
          <input
            type='password'
            value={password}
            onChange={handleChange(setPassword)}
            className='login-inputx'
          />

          <input
            type='submit'
            value='Iniciar sesión'
            className='login-buttonx'
          />
        </form>

        <button className='login-link-button' onClick={gotoHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default LoginView;