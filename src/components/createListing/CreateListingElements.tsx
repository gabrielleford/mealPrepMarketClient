import styled from "styled-components";

// ** Main Div ** //
export const CreateContainer = styled.div`
  padding: 20vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2000px;
  height: 100vh;
  transition: all 0.3s ease-in-out;
`

// ** Wrapper ** //
export const CreateWrapper = styled.div`
  width: 35vw;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
`

// ** Create Post Header ** //
export const CreateH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  margin-top: -4vh;
  color: #05386b;
`

// ** Create Form ** //
export const CreateForm = styled.form`
  display: grid;
  justify-content: center;
  grid-gap: 2.5vh;
`

export const CreateInput = styled.input`
  border-radius: 4px;
  border: thin solid #05386b;
`

export const CreateTextarea = styled.textarea`
  
`

export const CreateLabel = styled.label`
  margin-bottom: -2.6vh;
  color: #05386b;
`

export const PreviewSrc = styled.img`
  
`

export const CreatePostButton = styled.button`
  width: 80%;
  margin: -0.5vh auto 0 auto;
  color: #edf5e1;
  background: #05386b;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px 1px rgba(5, 56, 107, 0.4);
  font-size: 1.1rem;
  padding: 7.5px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
`