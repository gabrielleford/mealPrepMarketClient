import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import APIURL from './components/helpers/environments';
import CreateListing, { CreateProps } from './components/createListing/CreateListing';
import ListingById, { ListingProps } from './components/listingById/ListingById';
import ListingEdit from './components/listingById/ListingEdit';

export type AppProps = {
  isLoggedIn: boolean,
  sessionToken: string | null,
  userID: string | null,
  userName: string | null,
  listingEdit: boolean,
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>,
  setListingEdit: (listingEdit: boolean) => void,
}

const App: React.FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [userID, setUserID] = useState<string | null>('');
  const [userName, setName] = useState<string | null>('');
  const [listingEdit, setListingEdit] = useState<boolean>(false);

  const fetchData = async ():Promise<void> => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));

      if(sessionToken !== '') {
        await fetch(`${APIURL}/user/checkToken`, {
          method: 'POST',
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
          setUserID(res.userId);
          setName(`${res.firstName} ${res.lastName}`);
        })
        .then(() => {
          console.log(userName, userID);
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

          <Route path='/listing/:id' element={
            <ListingById
              userID={userID}
              isLoggedIn={isLoggedIn}
              sessionToken={sessionToken}
              userName={userName}
              fetchData={fetchData}
              listingEdit={listingEdit}
              setListingEdit={setListingEdit}
            />}
          />

          <Route path='/listing/edit/:id' element={
            <ListingEdit
              isLoggedIn={isLoggedIn}
              sessionToken={sessionToken}
              listingEdit={listingEdit}
              setListingEdit={setListingEdit}
            />
          }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
