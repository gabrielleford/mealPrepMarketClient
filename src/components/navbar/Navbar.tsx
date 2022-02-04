import React from "react";
import { AppProps } from "../../App";
import { Link } from "react-router-dom";
import { Header } from "./NavbarElements";

export type NavbarProps = {
  isLoggedIn: AppProps['isLoggedIn'],
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  clearToken: AppProps['clearToken'],
  setSessionToken: AppProps['setSessionToken']
}

class Navbar extends React.Component<NavbarProps> {
  constructor(props: NavbarProps) {
    super(props)

    this.state = {

    }
  }

  render(): React.ReactNode {
    return (
      <Header>
        <Link to='/'>Landing</Link>
        <Link to='/login'>Login</Link>
        <Link to='/create'>Create Listing</Link>
        {localStorage.getItem('Authorization') && <Link to={`/user/${this.props.userID}`}>My Account</Link>}
        {localStorage.getItem('Authorization') && <button onClick={this.props.clearToken}>Logout</button>}
      </Header>
    )
  }
}

export default Navbar; 