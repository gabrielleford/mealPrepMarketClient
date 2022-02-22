import React from "react";
import { Link } from "react-router-dom";
import AccountIcon from '../../assets/user.png';
import Logo from '../../assets/mealPrepMarketLogo.png';
import { IoMenu} from 'react-icons/io5'
import { BsCardChecklist, BsFilter, BsGear, BsReceipt } from "react-icons/bs";
import { CgProfile } from 'react-icons/cg';
import { AppProps } from "../../App";
import { FilterButton, Header, LogoDiv, MobileIcon, Title, TitleDiv } from "./NavbarElements";
import { Button, Group, Image, Menu, Text } from "@mantine/core";

export type NavbarProps = {
  sessionToken: AppProps['sessionToken'],
  user: AppProps['user'],
  isOpen: AppProps['isOpen'],
  filterOpen: AppProps['filterOpen'],
  windowPath: AppProps['windowPath'],
  setFilterOpen: AppProps['setFilterOpen'],
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
        <LogoDiv>
          <Text component={Link} to='/'>
            <Image src={Logo} alt='Meal Prep Market' width={70} />
          </Text>
        </LogoDiv>
        <Group>
          {(this.props.windowPath === '/') && <FilterButton onClick={() => this.props.setFilterOpen(!this.props.filterOpen)} filterOpen={this.props.filterOpen} isOpen={this.props.isOpen}>
            <Button leftIcon={<BsFilter/>} className='navButton' size='sm' radius='lg' compact>Filter Meals</Button>
          </FilterButton>}
          <MobileIcon onClick={() => this.props.setIsOpen(!this.props.isOpen)} isOpen={this.props.isOpen} filterOpen={this.props.filterOpen}>
            <IoMenu />
          </MobileIcon>
        </Group>
        <Group className='navMenu' mr='lg'>
          {(!localStorage.getItem('Authorization') && this.props.windowPath !== '') ? <Button className="navButton" size='lg' radius='lg' component={Link} to='/login' compact>Login or Sign Up</Button> : (!localStorage.getItem('Authorization') && this.props.windowPath !== '') ? <Button className="navButton" size='lg' radius='lg' component={Link} to='/login' compact>Login or Sign Up</Button> : ''}
          {(this.props.user.role !== 'secondary' && localStorage.getItem('Authorization')) && <Button className="navButton" size='lg' radius='lg' component={Link} to='/create' compact>Create Listing</Button>}
          {localStorage.getItem('Authorization') && <Button className="navButton" size='lg' radius='lg' onClick={this.props.clearToken} compact>Logout</Button>}
          {localStorage.getItem('Authorization') &&
            <Menu sx={{cursor: 'pointer'}} control={<Image src={AccountIcon} height={35} />}>
              <Menu.Label>My Account</Menu.Label>
              <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/user/${this.props.user.id}`} icon={<BsGear/>}>Settings</Menu.Item>
              <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/orders/${this.props.user.id}`} icon={<BsReceipt/>}>My Orders</Menu.Item>
              {this.props.user.role !== 'secondary' && <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/fulfillment/${this.props.user.id}`} icon={<BsCardChecklist/>}>Fulfillment</Menu.Item>}
              {this.props.user.role !== 'secondary' && <Menu.Item sx={{color: '#05386b'}} component={Link} to={`/profile/${this.props.user.id}`} icon={<CgProfile/>}>My Profile</Menu.Item>}
            </Menu>
          }
        </Group>
      </Header>
    )
  }
}

export default Navbar;