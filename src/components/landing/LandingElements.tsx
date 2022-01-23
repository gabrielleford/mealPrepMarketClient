import styled from "styled-components";


export const Header = styled.header`
  max-height: 300px;
  height: 180px;
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

  @media screen and (max-width: 1215px) {
    height: 160px;
  }

  @media screen and (max-width: 1032px) {
    height: 140px;
  }

  @media screen and (max-width: 768px) {
    height: 120px;
  }

  @media screen and (max-width: 480px) {
    height: 120px;
  }
`