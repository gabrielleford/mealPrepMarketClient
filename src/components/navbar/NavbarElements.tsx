import styled from "styled-components";


export const Header = styled.header`
  max-height: 180px;
  height: 130px;
  width: 100%;
  background: #8EE4AF;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 40px;
  border-bottom: 7px solid #edf5e1;
  transition: all .5s ease-in-out;
  z-index: 999;

  @media screen and (max-width: 1407px){
    max-height: 120px;
    height: 170px;
  }

  @media screen and (max-width: 1215px) {
    max-height: 110px;
    height: 160px;
  }

  @media screen and (max-width: 1032px) {
    max-height: 90px;
    height: 140px;
  }

  @media screen and (max-width: 768px) {
    max-height: 70px;
    height: 120px;
  }

  @media screen and (max-width: 480px) {
    max-height: 70px;
    height: 120px;
  }
`