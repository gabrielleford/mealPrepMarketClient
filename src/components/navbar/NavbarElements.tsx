import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../App";

type NavProps = {
  user: AppProps['user']
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
`

export const Title = styled(Link)`
  text-decoration: none;
  color: #05386b;
  font-size: 1.9rem;
  letter-spacing: 4px;
`

// ** Buttons/Links ** //
export const NavMenu = styled.ul<NavProps>`
  width: ${props => (props.user.id ? '20%' : props.user.role === 'primary' ? '30%' : '17%')};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-right: ${props => (props.user.id ? '2vw' : props.user.role === 'primary' ? '1vw' : '2vw')};
  list-style: none;
`

export const NavItem = styled.li`
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #edf5e1;
  background: #05386b;
  padding: 10px 15px;
  border: solid #05386b 2px;
  border-radius: 28px;
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
`

export const Account = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.70rem;
  text-decoration: none;
  color: #05386b;
  cursor: pointer;
`
export const Icon = styled.img`
  width: 45px;
  height: 45px;
`