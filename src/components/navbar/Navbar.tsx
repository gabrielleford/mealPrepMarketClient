import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./NavbarElements";

class Navbar extends React.Component {
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