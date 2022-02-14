import React from "react";
import { IoClose } from 'react-icons/io5';
import { AppProps } from "../../App";
import { GetStarted, GetStartedDiv, GetStartedH1, GetStartedP, Icon, Logout, SidebarContainer, SidebarLink, SidebarMenu } from "./SidebarElements";

type SidebarProps = {
  user: AppProps['user'],
  isOpen: AppProps['isOpen'],
  setIsOpen: AppProps['setIsOpen'],
  clearToken: AppProps['clearToken'],
}

class Sidebar extends React.Component<SidebarProps> {
  constructor(props:SidebarProps) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks = () => {
    if (localStorage.getItem('Authorization')) {
      return (
        <>
          <SidebarMenu>
            <SidebarLink to='/' onClick={() => this.props.setIsOpen(!this.props.isOpen)}>
              Home
            </SidebarLink>
            {this.props.user.role === 'primary' && 
              <SidebarLink to='/create' onClick={() => this.props.setIsOpen(!this.props.isOpen)}>
                Create Listing
              </SidebarLink>
            }
            {this.props.user.role === 'admin' &&
              <SidebarLink to='/create' onClick={() => this.props.setIsOpen(!this.props.isOpen)}>
                Create Listing
              </SidebarLink>
            }
            {this.props.user.role === 'main admin' &&
              <SidebarLink to='/create' onClick={() => this.props.setIsOpen(!this.props.isOpen)}>
                Create Listing
              </SidebarLink>
            }
            <SidebarLink to={`/user/${this.props.user.userId}`} onClick={() => this.props.setIsOpen(!this.props.isOpen)}>
              My Account
            </SidebarLink>
            <Logout onClick={() => {
                this.props.setIsOpen(!this.props.isOpen);
                this.props.clearToken();}}>
              Logout
            </Logout>
          </SidebarMenu>
        </>
      )   
    } else {
      return (
        <>
          <GetStartedDiv>
            <GetStartedH1>Making Your Life Easier</GetStartedH1>
            <GetStartedP>
              Join today to order high-quality <br/> meals from preppers near you.
            </GetStartedP>
            <GetStarted to='/login'>Get Started!</GetStarted>
          </GetStartedDiv>
        </>
      )
    }
  }

  render(): React.ReactNode {
    return (
      <SidebarContainer onClick={() => this.props.setIsOpen(!this.props.isOpen)} isOpen={this.props.isOpen}>
          <Icon>
            <IoClose />
          </Icon>
          {this.renderLinks()}
      </SidebarContainer>
    )
  }
}

export default Sidebar;