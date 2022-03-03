import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <Router>
    <Routes>
        <Route path="/*" element={<AuthProvider> <App /> </AuthProvider>} />
    </Routes>
  </Router>
  ,document.getElementById('root')
);
