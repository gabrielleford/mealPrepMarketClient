import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../App";
import { NavbarState } from "./Navbar";

type NavProps = {
  user: AppProps['user'],
  isOpen: NavbarState['isOpen'],
}

// ** Heading ** //
export const Header = styled.header`
  height: 130px;
  width: 100%;
  background: #8EE4AF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 40px;
  border-bottom: 7px solid #edf5e1;
  transition: all .5s ease-in-out;
  z-index: 999;

  @media screen and (max-width: 1407px){
    height: 120px;
  }

  @media screen and (max-width: 1215px) {
    height: 110px;
  }

  @media screen and (max-width: 1032px) {
    height: 90px;
  }

  @media screen and (max-width: 768px) {
    height: 70px;
  }

  @media screen and (max-width: 480px) {
    height: 70px;
  }
`

// ** Logo/Title ** //
export const TitleDiv = styled.div`
  margin-left: 2vw;

  @media screen and (max-width: 820px) {
    margin-left: 0;
  }
`

export const Title = styled(Link)`
  text-decoration: none;
  color: #05386b;
  font-size: 1.9rem;
  letter-spacing: 4px;

  @media screen and (max-width: 820px) {
    font-size: 1.3rem;
  }
`

// ** Buttons/Links ** //
export const NavMenu = styled.ul<NavProps>`
  width: ${props => (props.user.id ? '20%' : props.user.role === 'primary' ? '30%' : '17%')};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-right: ${props => (props.user.id ? '2vw' : props.user.role === 'primary' ? '1vw' : '2vw')};
  list-style: none;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px){
    width: ${props => (props.user.id ? '25%' : props.user.role === 'primary' ? '35%' : '22%')};
    margin-right: ${props => (props.user.id ? '1.5vw' : props.user.role === 'primary' ? '0' : '1.5vw')};
  }

  @media screen and (max-width: 1215px) {
    width: ${props => (props.user.id ? '30%' : props.user.role === 'primary' ? '40%' : '27%')};
    margin-right: ${props => (props.user.id ? '1vw' : props.user.role === 'primary' ? '0' : '1vw')};
  }

  @media screen and (max-width: 1032px) {
    width: ${props => (props.user.id ? '35%' : props.user.role === 'primary' ? '45%' : '32%')};
    margin-right: ${props => (props.user.id ? '1.5vw' : props.user.role === 'primary' ? '0' : '1.5vw')};
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`

export const NavItem = styled.li`
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #edf5e1;
  background: #05386b;
  padding: 10px 15px;
  border: solid #05386b 2px;
  border-radius: 28px;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1032px) {
    padding: 8.5px 12px;
    font-size: 0.9rem;
  }
`

export const Logout = styled.button`
  font-family: 'Open Sans', sans-serif;
  color: #edf5e1;
  background: #05386b;
  padding: 10px 15px;
  border: solid #05386b 2px;
  border-radius: 28px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 1407px){
    padding: 9.5px 15px;
    font-size: 1rem;
  }

  @media screen and (max-width: 1032px) {
    padding: 8.5px 12px;
    font-size: 0.9rem;
  }
`

export const Account = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.70rem;
  text-decoration: none;
  color: #05386b;
  cursor: pointer;

  @media screen and (max-width: 1407px){
    font-size: 0.65rem;
  }

  @media screen and (max-width: 1215px) {
    font-size: 0.6rem;
  }

  @media screen and (max-width: 1032px) {
    font-size: 0.55rem;
  }
`
export const Icon = styled.img`
  width: 45px;
  height: 45px;

  @media screen and (max-width: 1407px){
    width: 42px;
    height: 42px;
  }

  @media screen and (max-width: 1215px) {
    height: 39px;
    width: 39px;
  }

  @media screen and (max-width: 1032px) {
    height: 36px;
    width: 36px;
  }
`

export const MobileIcon = styled.div<NavProps>`
  display: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: 820px) {
    display: block;
    margin-top: 0.75vh;
    font-size: 2rem;
    color: #05386b;
    opacity: ${props => (props.isOpen ? '0%' : '100%')}
  }
`