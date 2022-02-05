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
    align-items: center;
    position: fixed;
    top: ${props => (props.isOpen ? '0' : '-100%')};
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #05386b;
    z-index: 999;
  }
`

export const Icon = styled.div`
  position: absolute;
  top: 1rem;
  right: 2.5rem;
  font-size: 2rem;
  color: #5cdb95;
  cursor: pointer;
`

// ** Logged in user ** //
export const SidebarMenu = styled.ul`
  display: grid;
  justify-content: center;
  margin-right: 8vw;
  text-align: center;
  grid-gap: 4rem;
`

export const SidebarLink = styled(Link)`
  color: #5cdb95;
  font-size: 3rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 1.5rem;
  }
`

export const Logout = styled.button`
  font-family: 'Open Sans', sans-serif;
  color: #5cdb95;
  font-size: 3rem;
  border: none;
  background: none;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 1.5rem;
  }
`

// ** New user ** //
export const GetStartedDiv = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  height: 40%;
  color: #05386b;
  background: #5cdb95;
  padding: 50px 75px 70px 75px;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 710px) {
    padding: 50px 30px 70px 30px;
  }

  @media screen and (max-width: 620px) {
    padding: 50px 0 70px 0;
  }
`

export const GetStartedH1 = styled.h1`
  font-size: 2rem;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 460px) {
    font-size: 1.7rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 1.2rem;
  }
`

export const GetStartedP = styled.p`
  margin-top: -2vh;
  padding: 0 120px;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 420px) {
    font-size: 0.9rem;
    padding: 0 40px;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
    padding: 0 13px;
  }
`

export const GetStarted = styled(Link)`
  width: 18%;
  text-decoration: none;
  color: #edf5e1;
  background: #05386b;
  font-size: 0.9rem;
  padding: 5px 10px;
  margin: 0 auto;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 560px) {
    width: 20%;
  }

  @media screen and (max-width: 500px) {
    width: 24%;
  }

  @media screen and (max-width: 420px) {
    width: 26%;
  }

  @media screen and (max-width: 385px) {
    width: 32%
  }

  @media screen and (max-width: 310px) {
    width: 36%;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
    width: 40%;
  }
`