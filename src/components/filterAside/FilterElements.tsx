import styled from "styled-components";
import { AppProps } from "../../App";

type FilterProps = {
  filterOpen: AppProps['filterOpen'],
}

export const SidebarContainer = styled.aside<FilterProps>`
  display: none;
  top: 0;
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 768px) {
    display: grid;
    align-items: center;
    position: fixed;
    top: ${props => (props.filterOpen ? '0' : '-100%')};
    opacity: ${props => (props.filterOpen ? '100%' : '0')};
    right: 0;
    width: 40vw;
    height: 100vh;
    color: #05386b;
    background: rgba(237, 245, 225, 0.99);
    z-index: 999;
  }

  @media screen and (max-width: 480px) {
    left: 0;
    width: 100vw;
  }
`

export const Icon = styled.div`
  position: absolute;
  top: 1rem;
  font-size: 2rem;
  color: #05386b;
  cursor: pointer;

  @media screen and (max-width: 768px) and (min-width: 481px) {
    left: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    right: 3rem;
  }
`

export const TagLabel = styled.label`
  border-bottom: solid 2px transparent;
  transition: all 0.2 ease-in-out;
  font-size: 1.2rem;

  &:hover {
    border-bottom: solid 2px #8ee4af;
  }
`

export const CreateInput = styled.input`
  display: none;

  &:checked + ${TagLabel} {
  border-bottom: solid 2px #5cdb95;
  }
`