import React from 'react';
import './App.css';
import Signup from './components/Auth/Signup';
import Background from './components/background/Background';
import Landing from './components/landing/Landing';

function App() {
  return (
    <>
      <Landing />
      <Signup />
      <Background />
    </>
  );
}

export default App;
