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
import UserProfile from './components/userProfile/UserProfile';
import Orders from './components/orders/Orders';
import Fulfillment from './components/orders/Fulfillment';
import EditUser from './components/userProfile/EditUser';
import UserInfo from './components/userProfile/UserInfo';

export type AppProps = {
  isLoggedIn: boolean,
  sessionToken: string | null,
  userID: string | null,
  userName: string | null,
  user: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    profileDescription: string,
    role: string
  },
  listingEdit: boolean,
  userEdit: boolean,
  what: string,
  dlt: boolean,
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>,
  setListingEdit: (listingEdit: boolean) => void,
  setUserEdit: (userEdit: boolean) => void,
  setWhat: (what: string) => void,
  setDelete: (del: boolean) => void,
}

const App: React.FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [userID, setUserID] = useState<string | null>('');
  const [userName, setName] = useState<string | null>('');
  const [listingEdit, setListingEdit] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<boolean>(false);
  const [what, setWhat] = useState<string>('');
  const [dlt, setDelete] = useState<boolean>(false);
  const [user, setUser] = useState<{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    profileDescription: string,
    role: string}>({
      id: '',
      firstName: '', 
      lastName: '', 
      email: '', 
      profilePicture: '', 
      profileDescription: '', 
      role: ''});

  const fetchData = async ():Promise<void> => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));

      if(sessionToken !== '') {
        await fetch(`${APIURL}/user/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`
          }
        })
        .then(res => {
          if (res.status === 200) {
            setIsLoggedIn(true)
          }
          else setIsLoggedIn(false);
          return res.json()
        })
        .then(res => {
          console.log(res);
          setUserID(res.userId);
          setName(`${res.firstName} ${res.lastName}`);
          setUser(res)
        })
        .catch(error => console.log(error))
      }
    } else {
      setIsLoggedIn(false);
      setUserID('');
      setName('');
      setUser({
        id: '',
        firstName: '', 
        lastName: '', 
        email: '', 
        profilePicture: '', 
        profileDescription: '', 
        role: ''});
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
    setDelete(false);
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
          userID={userID}
          user={user}
        />

        <Routes>
          <Route path='/' element={
            <Landing 
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
          <Route path='/user/:id' element={
            <UserInfo
              user={user}
              dlt={dlt}
              what={what}
              userEdit={userEdit}
              userID={userID}
              sessionToken={sessionToken}
              setDelete={setDelete}
              setWhat={setWhat}
              setUserEdit={setUserEdit}
              fetchData={fetchData}
              listingID=''
              clearToken={clearToken}
            />}
          />
          <Route path='/edit/:id' element={
            <EditUser
              sessionToken={sessionToken}
              user={user}
              dlt={dlt}
              what={what}
              userEdit={userEdit}
              userID={userID}
              setDelete={setDelete}
              setWhat={setWhat}
              setUserEdit={setUserEdit}
              listingID=''
              clearToken={clearToken}
            />}
          />
          
          <Route path='/create' element={
            <CreateListing 
              sessionToken={sessionToken}
            />} 
          />
          <Route path='/listing/:id' element={
            <ListingById
              userID={userID}
              sessionToken={sessionToken}
              userName={userName}
              listingEdit={listingEdit}
              what={what}
              dlt={dlt}
              setListingEdit={setListingEdit}
              fetchData={fetchData}
              setWhat={setWhat}
              setDelete={setDelete}
              clearToken={clearToken}
            />}
          />
          <Route path='/listing/edit/:id' element={
            <ListingEdit
              sessionToken={sessionToken}
              listingEdit={listingEdit}
              what={what}
              dlt={dlt}
              userID={userID}
              setListingEdit={setListingEdit}
              setWhat={setWhat}
              setDelete={setDelete}
              clearToken={clearToken}
            />}
          />
          <Route path='/profile/:id' element={
            <UserProfile
              userID={userID}
            />}
          />
          <Route path='/orders/:id' element={
            <Orders
              userID={userID}
              sessionToken={sessionToken}
            />}
          />
          <Route path='/fulfillment/:id' element={
            <Fulfillment
              userID={userID}
              sessionToken={sessionToken}
              fetchData={fetchData}
            />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
