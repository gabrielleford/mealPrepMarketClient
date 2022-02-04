import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../App";

type SidebarProps = {
  isOpen: AppProps['isOpen'],
}

export const SidebarContainer = styled.aside<SidebarProps>`
  display: none;
  top: 0;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 820px) {
    display: grid;
    position: fixed;
    top: ${props => (props.isOpen ? '0' : '-100%')};
    left: 0;
    width: 100%;
    height: 100vh;
    background: #05386b;
    z-index: 999;
  }
`

export const Icon = styled.div`
  
`

export const SidebarWrapper = styled.div`
  
`

export const SidebarMenu = styled.ul`
  
`

export const SidebarLink = styled(Link)`
  
`