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

  const gotoHomeView = () => {
    navigate('/');
  };

  return (
    // className={this.state.animationClass}
    <div className='login-container'>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <h1 className='login-title'>Clinic Management System</h1>

      <Stack spacing={2}>
        <TextField
          label='Usuario'
          variant='filled'
          onChange={handleChange(setUsername)}
        />
        <TextField
          label='Contraseña'
          variant='filled'
          type='password'
          onChange={handleChange(setPassword)}
        />
      </Stack>

      <div className='login-buttons'>
        <Button
          style={{ margin: '2px' }}
          variant='contained'
          color='primary'
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
        <Button
          style={{ margin: '2px' }}
          variant='contained'
          color='success'
          onClick={gotoHomeView}
        >
          Ir al inicio
        </Button>
      </div>

      {showBackdrop ? <BackDropLoading /> : null}
    </div>
  );
};

export default LoginView;
