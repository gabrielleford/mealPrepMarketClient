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
  width: fit-content;
  margin: 0 auto;
  font-size: 2.2rem;
  text-decoration: none;
  transition: font-size 0.3s ease-in-out;
  transition: border-bottom 0.1s ease-in-out;

  &:hover {
    border-bottom: solid #5cdb95 3px;
  }

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
  font-size: 2.2rem;
  width: fit-content;
  margin: 0 auto;
  border: none;
  background: none;
  cursor: pointer;
  transition: font-size 0.3s ease-in-out;
  transition: border-bottom 0.1s ease-in-out;

  &:hover {
    border-bottom: solid #5cdb95 3px;
  }

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
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 420px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
  }
`

export const GetStarted = styled(Link)`
  width: fit-content;
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

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
  }
`