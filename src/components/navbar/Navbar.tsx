import React from "react";
import { IoMenu} from 'react-icons/io5'
import { AppProps } from "../../App";
import accountIcon from '../../assets/user.png';
import { Account, Header, Icon, Logout, MobileIcon, NavItem, NavLink, NavMenu, Title, TitleDiv } from "./NavbarElements";

export type NavbarProps = {
  sessionToken: AppProps['sessionToken'],
  user: AppProps['user'],
  isOpen: AppProps['isOpen'],
  clearToken: AppProps['clearToken'],
  setSessionToken: AppProps['setSessionToken'],
  setIsOpen: AppProps['setIsOpen'],
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
        <MobileIcon onClick={() => this.props.setIsOpen(!this.props.isOpen)} isOpen={this.props.isOpen} user={this.props.user}>
          <IoMenu />
        </MobileIcon>
        <NavMenu isOpen={this.props.isOpen} user={this.props.user}>
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
              <Account href={`http://localhost:3000/user/${this.props.user.userId}`}><Icon src={accountIcon} />My Account</Account>
            </NavItem>
          }
        </NavMenu>
      </Header>
    )
  }
}

export default Navbar;

/* <MobileMenu isOpen={this.state.isOpen} user={this.props.user}>
    <MobileLink to='/login'>Login</MobileLink>
    <MobileLink to='/create'>Create New Listing</MobileLink>
    <MobileLink to={`http://localhost:3000/user/${this.props.user.id}`}>My Account</MobileLink>
    <MobileBtn onClick={this.props.clearToken}>Logout</MobileBtn>
    <CloseMobileIcon onClick={this.setOpen} isOpen={this.state.isOpen} user={this.props.user}>
      <IoClose />
    </CloseMobileIcon>
  </MobileMenu>
 */