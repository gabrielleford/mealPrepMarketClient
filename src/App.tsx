import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import APIURL from './components/helpers/environments';

export type SetSessionToken = {
  setSessionToken: (sessionToken: string) => void
}

export type AppProps = {
  isLoggedIn: boolean,
  sessionToken: string | null,
  userID: string | null,
  name: string | null
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>
}


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [userID, setUserID] = useState<string | null>('');
  const [name, setName] = useState<string | null>('');
  const navigate = useNavigate();

  const fetchData = async () => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));

      if(sessionToken !== '') {
        await fetch(`${APIURL}/user/checkToken`, {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false);
            return res.json();
          }
        })
        .then(res => {
          setUserID(res.userId);
          setName(`${res.firstName} ${res.lastName}`);
        })
        .catch(error => console.log(error))
      }
    } else {
      setIsLoggedIn(false);
    }
  }

  const updateToken = (newToken:string) => {
    localStorage.setItem('Authorization', newToken);
    setSessionToken(newToken);
  }
  
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <>
      <Router>
        <Navbar clearToken={clearToken} setSessionToken={setSessionToken} isLoggedIn={isLoggedIn} name={name}/>


        <Routes>
          <Route path='/home' element={
            <Landing 
              fetchData={fetchData}
              sessionToken={sessionToken}
              isLoggedIn={isLoggedIn}
            />} 
          />
          <Route path='/register' element={
              <Signup
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
            />} 
          />
          <Route path='login' element={
              <Login 
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
            />} 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;