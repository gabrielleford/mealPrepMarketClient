import React from "react";
import { AppProps } from "../../App";
import { Link } from "react-router-dom";
import { Header } from "./NavbarElements";

export type NavbarProps = {
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  sessionToken: AppProps['sessionToken'],
  clearToken: AppProps['clearToken'],
  setSessionToken: AppProps['setSessionToken']
}

class Navbar extends React.Component<{
  isLoggedIn:AppProps['isLoggedIn'], 
  userName:AppProps['userName'], 
  sessionToken:AppProps['sessionToken'], 
  clearToken:AppProps['clearToken'], 
  setSessionToken: AppProps['setSessionToken']
}, NavbarProps> {
  constructor(props: NavbarProps) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      userName: this.props.userName,
      sessionToken: this.props.sessionToken,
      clearToken: this.props.clearToken,
      setSessionToken: this.props.setSessionToken,
    }
  }

  render(): React.ReactNode {
    return (
      <Header>
        <h1>Debug:</h1>
        {/* <p>Session Token: {this.state.sessionToken}</p> */}
        <Link to='/'>Landing</Link>
        <Link to='/login'>Login</Link>
        <Link to='/create'>Create Post</Link>
      </Header>
    )
  }
}

export default Navbar; 