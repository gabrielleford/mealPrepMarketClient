import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../App";

type NavProps = {
  isOpen: AppProps['isOpen'],
  filterOpen: AppProps['filterOpen'],
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
  transition: all .1s ease-in-out;
  z-index: 100;

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
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 820px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`

export const LogoDiv = styled.div`
  display: none;
  margin-left: 2vw;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 500px) {
    display: block;
    margin-left: -10rem;
  }

  @media screen and (max-width: 410px) {
    margin-left: -7rem;
  }

  @media screen and (max-width: 360px) {
    margin-left: -3rem;
  }

  @media screen and (max-width: 300px) {
    display: none;
  }
`

export const MobileIcon = styled.div<NavProps>`
  display: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 0.75vh;
    font-size: 2rem;
    color: #05386b;
    opacity: ${props => (props.isOpen ? '0%' : '100%')}
  }
`
export const FilterButton = styled.div<NavProps>`
  display: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: 768px) {
    display: block;
    opacity: ${props => (props.filterOpen ? '0%' : '100%')}
  }
`