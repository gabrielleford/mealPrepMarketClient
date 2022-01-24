import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Background from './components/background/Background';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';

const App = () => {
  // navigate = useNavigate();
  return (
    <>
      <Router>
        <Navbar />


        <Routes>
          <Route path='/home' element={<Landing />} />
          <Route path='/register' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
