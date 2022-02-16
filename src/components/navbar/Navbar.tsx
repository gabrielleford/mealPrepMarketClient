import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from '../../assets/user.png';
import { IoMenu} from 'react-icons/io5'
import { BsCardChecklist, BsGear, BsReceipt } from "react-icons/bs";
import { CgProfile } from 'react-icons/cg';
import { AppProps } from "../../App";
import { Header, MobileIcon, Title, TitleDiv } from "./NavbarElements";
import { Button, Group, Image, Menu } from "@mantine/core";

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
        <Group className='navMenu' mr='lg'>
          {!localStorage.getItem('Authorization') && <Button className="navButton" size='lg' radius='lg' component={Link} to='/login' compact>Login or Sign Up</Button>}
          {(this.props.user.role === 'primary' || this.props.user.role === 'admin' || this.props.user.role === 'main admin') && <Button className="navButton" size='lg' radius='lg' component={Link} to='/create' compact>Create Listing</Button>}
          {localStorage.getItem('Authorization') && <Button className="navButton" size='lg' radius='lg' onClick={this.props.clearToken} compact>Logout</Button>}
          <Menu sx={{cursor: 'pointer'}} control={<Image src={AccountIcon} height={35} />}>
            <Menu.Label>My Account</Menu.Label>
            <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/user/${this.props.user.userId}`} icon={<BsGear/>}>Settings</Menu.Item>
            <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/orders/${this.props.user.userId}`} icon={<BsReceipt/>}>My Orders</Menu.Item>
            {(this.props.user.role === 'primary' || this.props.user.role === 'admin' || this.props.user.role === 'main admin') && <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/fulfillment/${this.props.user.userId}`} icon={<BsCardChecklist/>}>Fulfillment</Menu.Item>}
            {(this.props.user.role === 'primary' || this.props.user.role === 'admin' || this.props.user.role === 'main admin') && <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/profile/${this.props.user.userId}`} icon={<CgProfile/>}>My Profile</Menu.Item>}
          </Menu>
        </Group>
      </Header>
    )
  }
}

export default Navbar;

{/* <NavMenu isOpen={this.props.isOpen} user={this.props.user}>
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
</NavMenu> */}