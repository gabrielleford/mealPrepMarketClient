import styled from "styled-components";

// ** Delete Container ** //
export const DeleteContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  width:100%;
  height: 100vh;
  background: rgba(92, 219, 149, 0.9);
  z-index: 99;
`

// ** Confirm Deletion ** //
export const ConfirmDeleteDiv = styled.div`
  margin: 10vh auto;
  width: 35%;
  max-height: 60vh;
  border-radius: 10px;
  background: #05386b;
  padding: 20px 0 40px 0;
`

// ** Confirm Delete Header ** //
export const DeleteH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  color: #5cdb95;
`

// ** Gif ** //
export const Gif = styled.img`
  display: block;
  max-width: 100%;
  max-height: 30vh;
  margin-left: auto;
  margin-right: auto;
`

// ** Confirm Deletion Text ** //
export const DeleteP = styled.p`
  font-weight: 300;
  color: #edf5e1;
  text-align: center;
`

// ** Confirm Delete Button ** //
export const DeleteButton = styled.button`
  width: 15%;
  text-align: center;
  color: #05386b;
  background: #5cdb95;
  border: none;
  border-radius: 4px;
  margin-right: 1vw;
  margin-left: 1vw;
  box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #8ee4af;
    transform: scale(1.1)
  }
`

// ** Cancel Button ** //
export const CancelButton = styled.button`
  width: 15%;
  text-align: center;
  padding: 3px 0;
  color: #05386b;
  background: #5cdb95;
  border: none;
  border-radius: 4px;
  margin-right: 1vw;
  margin-left: 1vw;
  box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #8ee4af;
    transform: scale(1.1)
  }
`