import React from "react";
import { AppProps } from "../../App";
import { Link } from "react-router-dom";
import { Header } from "./NavbarElements";

export type NavbarProps = {
  isLoggedIn: AppProps['isLoggedIn'],
  name: AppProps['name']
  clearToken: AppProps['clearToken'],
  setSessionToken: AppProps['setSessionToken']
}

class Navbar extends React.Component<NavbarProps> {
  render(): React.ReactNode {
    return (
      <Header>
        <h1>Debug</h1>
        <Link to='/home'>Landing</Link>
        <Link to='/login'>Login</Link>
      </Header>
    )
  }
}

export default Navbar;