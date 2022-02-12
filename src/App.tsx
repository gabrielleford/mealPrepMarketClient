import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, MantineProvider } from '@mantine/core';
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
import UserInfo from './components/userProfile/UserInfo';
import Sidebar from './components/sidebar/Sidebar';

export type AppProps = {
  sessionToken: string | null,
  user: {
    userId: string,
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
  isOpen: boolean,
  prevPath: string,
  popoverOpen: boolean,
  response: number,
  clearToken: () => void,
  updateToken: (newToken: string) => void,
  setSessionToken: (sessionToken: string | null) => void,
  fetchData: () => Promise<void>,
  setListingEdit: (listingEdit: boolean) => void,
  setUserEdit: (userEdit: boolean) => void,
  setWhat: (what: string) => void,
  setDelete: (del: boolean) => void,
  setIsOpen: (isOpen: boolean) => void,
  setPrevPath: (prevPath: string) => void,
  setPopoverOpen: (popoverOpened: boolean) => void,
  setResponse: (response: number) => void,
}

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [listingEdit, setListingEdit] = useState<boolean>(false);
  const [what, setWhat] = useState<string>('');
  const [dlt, setDelete] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prevPath, setPrevPath] = useState<string>('/');
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userDescrip, setUserDescrip] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPic, setUserPic] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [user, setUser] = useState<{
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    profileDescription: string,
    role: string}>({
      userId: '',
      firstName: '', 
      lastName: '', 
      email: '', 
      profilePicture: '', 
      profileDescription: '', 
      role: ''});

  const updateToken = (newToken:string) => {
    localStorage.setItem('Authorization', newToken);
    setSessionToken(newToken);
  }
  
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setWhat('');
    setDelete(false);
    setPrevPath('/');
    setUser({
      userId: '',
      firstName: '', 
      lastName: '', 
      email: '', 
      profilePicture: '', 
      profileDescription: '', 
      role: ''});
  }

  useEffect(() => {
    if (localStorage.getItem('Authorization'))
    setSessionToken(localStorage.getItem('Authorization')); 

      const fetchData = async ():Promise<void> => {
        if (sessionToken !== '' && user.userId === '') {
          await fetch(`${APIURL}/user/checkToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`
            }
          })
          .then(res => {
            console.log('hitting the fetch')
            return res.json()
          })
          .then(res => {
            setUser(res)
          })
          .then(() => user)
          .catch(error => console.log(error))
        } else if (user.userId !== '' && sessionToken === '') {
          setUser({
            userId: '',
            firstName: '', 
            lastName: '', 
            email: '', 
            profilePicture: '', 
            profileDescription: '', 
            role: ''});
        }
      }

      fetchData()

  }, [user, sessionToken])

  console.log(user);
  return (
    <MantineProvider theme={{
      fontFamily: 'Open Sans, sans-serif',
      headings: {fontFamily: 'Montserrat'},
      colors: {
        primary: ['#c0f1d6', '#abedc9', '#96e8bb',  '#82e3ae', '#5cdb95', '#43d685', '#2ed177', '#29bc6b', '#209254', '#1c7d48'   ],
        secondary: ['#cee6fd', '#b6d9fc', '#9eccfa', '#6db3f8', '#05386b', '#0b80f4', '#0966c3', '#074d92', '#3c99f6', '#053361']
      },
      primaryColor: 'primary',
    }}>
      <div id='container'>
        <Router>
          <Navbar 
            clearToken={clearToken} 
            setSessionToken={setSessionToken} 
            sessionToken={sessionToken} 
            user={user}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Sidebar
            user={user}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clearToken={clearToken}
          />
        <Container mt={130} fluid>
        <Routes>
            <Route path='/' element={
              <Landing
                sessionToken={sessionToken}
                setPrevPath={setPrevPath}
                setResponse={setResponse}
              />} 
            />
            <Route path='/register' element={
              <Signup
                updateToken={updateToken}
                sessionToken={sessionToken}
                prevPath={prevPath}
                popoverOpen={popoverOpen}
                setSessionToken={setSessionToken}
                setPopoverOpen={setPopoverOpen}
              />} 
            />
            <Route path='/login' element={
              <Login 
                updateToken={updateToken}
                sessionToken={sessionToken}
                prevPath={prevPath}
                setSessionToken={setSessionToken}
              />} 
            />
            <Route path='/user/:id' element={
              <UserInfo
                user={user}
                dlt={dlt}
                what={what}
                sessionToken={sessionToken}
                response={response}
                setDelete={setDelete}
                setWhat={setWhat}
                listingID=''
                clearToken={clearToken}
                setResponse={setResponse}
              />}
            />
            <Route path='/create' element={
              <CreateListing 
                sessionToken={sessionToken}
              />} 
            />
            <Route path='/listing/:id' element={
              <ListingById
                sessionToken={sessionToken}
                listingEdit={listingEdit}
                what={what}
                dlt={dlt}
                response={response}
                user={user}
                setListingEdit={setListingEdit}
                setWhat={setWhat}
                setDelete={setDelete}
                clearToken={clearToken}
                setPrevPath={setPrevPath}
                setResponse={setResponse}
              />}
            />
            <Route path='/listing/edit/:id' element={
              <ListingEdit
                sessionToken={sessionToken}
                listingEdit={listingEdit}
                what={what}
                dlt={dlt}
                response={response}
                user={user}
                setListingEdit={setListingEdit}
                setWhat={setWhat}
                setDelete={setDelete}
                clearToken={clearToken}
                setResponse={setResponse}
              />}
            />
            <Route path='/profile/:id' element={
              <UserProfile
                user={user}
              />}
            />
            <Route path='/orders/:id' element={
              <Orders
                user={user}
                sessionToken={sessionToken}
              />}
            />
            <Route path='/fulfillment/:id' element={
              <Fulfillment
                user={user}
                sessionToken={sessionToken}
              />}
            />
          </Routes>
        </Container>
        </Router>
        {/* <div id='footerDiv'>
            <footer id='footer'>
              <p>© <a href='https://gabrielleford.github.io/'>Gabrielle Ford</a> 2022</p>
            </footer>
          </div> */}
      </div>
    </MantineProvider>
  );
}

export default App;
