import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Background from './components/background/Background';
import Landing from './components/landing/Landing';

function App() {
  return (
    <>
      <Landing />
      {/* <Signup /> */}
      <Login />
      <Background />
    </>
  );
}

export default App;
