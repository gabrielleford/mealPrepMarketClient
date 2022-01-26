import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import APIURL from './components/helpers/environments';
import CreateListing from './components/createListing/CreateListing';

export type SetSessionToken = {
  setSessionToken: (sessionToken: string) => void
}

export type AppProps = {
  isLoggedIn: boolean,
  sessionToken: string | null,
  userID: string | null,
  userName: string | null
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>
}


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [userID, setUserID] = useState<string | null>('');
  const [userName, setName] = useState<string | null>('');

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
          if (res.status == 200) {
            setIsLoggedIn(true)
          }
          else setIsLoggedIn(false);
          return res.json()
        })
        .then(res => {
          console.log(res);
          setUserID(res.id);
          setName(`${res.firstName} ${res.lastName}`);
        })
        .then(() => {
          console.log(userName, userID);
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
  }

  useEffect(() => {
    fetchData()
  }, [sessionToken])

  return (
    <>
      <Router>
        <Navbar 
          clearToken={clearToken} 
          setSessionToken={setSessionToken} 
          sessionToken={sessionToken} 
          isLoggedIn={isLoggedIn} 
          userName={userName}
        />


        <Routes>
          <Route path='/' element={
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
          <Route path='/login' element={
            <Login 
            updateToken={updateToken}
            sessionToken={sessionToken}
            setSessionToken={setSessionToken}
            />} 
          />

          <Route path='/create' element={
            <CreateListing 
              sessionToken={sessionToken}
              isLoggedIn={isLoggedIn}
            />} 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
