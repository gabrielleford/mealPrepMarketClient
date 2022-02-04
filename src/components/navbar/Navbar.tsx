import React from "react";
import { AppProps } from "../../App";
import accountIcon from '../../assets/user.png';
import { Account, Header, Icon, Logout, NavItem, NavLink, NavMenu, Title, TitleDiv } from "./NavbarElements";

export type NavbarProps = {
  isLoggedIn: AppProps['isLoggedIn'],
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  user: AppProps['user'],
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
        <TitleDiv>
          <Title to='/'>Meal Prep Market</Title>
        </TitleDiv>
        <NavMenu user={this.props.user}>
          {!localStorage.getItem('Authorization') && 
            <NavItem>
              <NavLink to='/login'>Login or Signup</NavLink>
            </NavItem>
          }
          {this.props.user.role === 'primary' && 
            <NavItem>
              <NavLink to='/create'>Create New Listing</NavLink>
            </NavItem>
          }
          {localStorage.getItem('Authorization') && 
            <NavItem>
              <Logout onClick={this.props.clearToken}>Logout</Logout>
            </NavItem>
          }
          {localStorage.getItem('Authorization') &&
            <NavItem>
              <Account href={`http://localhost:3000/user/${this.props.user.id}`}><Icon src={accountIcon} />My Account</Account>
            </NavItem>
          }
        </NavMenu>
      </Header>
    )
  }
}

export default Navbar; 