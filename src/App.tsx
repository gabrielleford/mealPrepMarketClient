import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import APIURL from './components/helpers/environments';
import CreateListing from './components/createListing/CreateListing';
import ListingById from './components/listingById/ListingById';
import ListingEdit from './components/listingById/ListingEdit';

export type AppProps = {
  isLoggedIn: boolean,
  sessionToken: string | null,
  userID: string | null,
  userName: string | null,
  listingEdit: boolean,
  what: string,
  dlt: boolean,
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>,
  setListingEdit: (listingEdit: boolean) => void,
  setWhat: (what: string) => void,
  setDelete: (del: boolean) => void,
}

const App: React.FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [userID, setUserID] = useState<string | null>('');
  const [userName, setName] = useState<string | null>('');
  const [listingEdit, setListingEdit] = useState<boolean>(false);
  const [what, setWhat] = useState<string>('');
  const [dlt, setDelete] = useState<boolean>(false);

  const fetchData = async ():Promise<void> => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));

      if(sessionToken !== '') {
        await fetch(`${APIURL}/user/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionToken}`
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
          setUserID(res.userId);
          setName(`${res.firstName} ${res.lastName}`);
        })
        .catch(error => console.log(error))
      }
    } else {
      setIsLoggedIn(false);
      setUserID('');
      setName('');
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
  })

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

          <Route path='/listing/:id' element={
            <ListingById
              userID={userID}
              isLoggedIn={isLoggedIn}
              sessionToken={sessionToken}
              userName={userName}
              listingEdit={listingEdit}
              what={what}
              dlt={dlt}
              setListingEdit={setListingEdit}
              fetchData={fetchData}
              setWhat={setWhat}
              setDelete={setDelete}
            />}
          />

          <Route path='/listing/edit/:id' element={
            <ListingEdit
              isLoggedIn={isLoggedIn}
              sessionToken={sessionToken}
              listingEdit={listingEdit}
              what={what}
              dlt={dlt}
              setListingEdit={setListingEdit}
              setWhat={setWhat}
              setDelete={setDelete}
            />
          }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
