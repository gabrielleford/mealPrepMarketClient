import { Link } from "react-router-dom";
import styled from "styled-components";
import { LandingProps } from "./Landing";

type Props = {
  sessionToken: LandingProps['sessionToken'],
}

export const Banner = styled.div<Props>`
  display: ${props => (props.sessionToken ? 'none' : 'block' )};
  position: relative;
  left: calc(-50vw + 50%);
  margin-left: -0.5rem;
  margin-top: -1rem;
  width: 100vw;
  padding: 0.5rem 0 1.4rem 0;
  background: #05386b;
  color: #edf5e1;
  text-align: center;
  /* border-bottom: 7px solid #edf5e1; */

  @media screen and (max-width: 1407px) and (min-width: 1216px) {
    margin-top: -1.5rem;
  }

  @media screen and (max-width: 1215px) and (min-width: 1033px) {
    margin-top: -2rem;
  }

  @media screen and (max-width: 1032px) and (min-width: 769px) {
    margin-top: -3rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: -4.5rem;
  }
`

export const BannerH1 = styled.h1`
  font-weight: 400;
  transition: 0.2s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`

export const BannerP = styled.p`
  font-weight: 300;
  transition: 0.2s ease-in-out;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const BannerButton = styled(Link)`
  text-decoration: none;
  width: fit-content;
  color: #05386b;
  background: #5cdb95;
  padding: 4px 8px 4px 8px;
  border: solid 2px #5cdb95;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px rgba(92, 219, 149, 0.5);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #8ee4af;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const FilterBar = styled.div<Props>`
  position: relative;
  left: calc(-50vw + 50%);
  margin-left: -0.5rem;
  margin-top: ${props => (props.sessionToken ? '-1rem' : '0rem' )} ;
  width: 100vw;
  padding: 1px 0 0.8rem 0;
  color: #05386b;
  background: #edf5e1;
  text-align: center;
  margin-bottom: 2rem;

  @media screen and (max-width: 1407px) {
    margin-top: ${props => (props.sessionToken ? '-2rem': '0')}
  }

  @media screen and (max-width: 1032px) {
    margin-top: ${props => (props.sessionToken ? '-3rem': '0')}
  }

  @media screen and (max-width: 768px) {
    display: none
  }
`

export const TagLabel = styled.label`
  border-bottom: solid 2px transparent;
  transition: all 0.2 ease-in-out;

  &:hover {
    border-bottom: solid 2px #8ee4af;
  }

  @media screen and (max-width: 1032px) {
    font-size: 0.9rem;
  }
`

export const CreateInput = styled.input`
  display: none;

  &:checked + ${TagLabel} {
  border-bottom: solid 2px #5cdb95;
  }
`