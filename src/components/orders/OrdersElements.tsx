import styled from "styled-components";

export const Banner = styled.div`
  position: relative;
  left: calc(-50vw + 50%);
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  width: 100vw;
  padding: 0.5rem 0 1.4rem 0;
  background: #05386b;
  color: #edf5e1;
  text-align: center;

  @media screen and (max-width: 1407px) and (min-width: 1216px) {
    margin-top: -1.3rem;
  }

  @media screen and (max-width: 1215px) and (min-width: 1033px) {
    margin-top: -1.8rem;
  }

  @media screen and (max-width: 1032px) and (min-width: 769px) {
    margin-top: -3rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: -4.5rem;
  }
`