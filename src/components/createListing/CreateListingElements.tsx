import styled from "styled-components";

// ** Main Div ** //
export const CreateContainer = styled.div`
  margin-top: 23vh;
  margin-bottom: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2000px;
  height: 100vh;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px){
    margin-top: 21vh;
  }

  @media screen and (max-width: 1215px) {
    margin-top: 19vh;
  }

  @media screen and (max-width: 1032px) {
    margin-top: 16vh;
  }

  @media screen and (max-width: 768px) {
    margin-top: 13vh;
  }
`

// ** Wrapper ** //
export const CreateWrapper = styled.div`
  width: 35%;
  height: fit-content;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 7px;
  padding: 45px 0 30px 0px;
  background: #edf5e1;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px){
    width: 35%;
  }

  @media screen and (max-width: 1215px) {
    width: 40%;
  }

  @media screen and (max-width: 1032px) {
    width: 50%
  }

  @media screen and (max-width: 768px) {
    width: 65%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
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
  width: 100%;
  display: grid;
  grid-template-columns: 90%;
  grid-gap: 2vh;
  justify-content: center;
`

export const CreateInput = styled.input`
  width: 90%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  border: thin solid #05386b;
`

export const CreateTextarea = styled.textarea`
  font-family: 'Open Sans', sans-serif;
  width: 90%;
  max-width: 90%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  border: thin solid #05386b;
`

export const CreateLabel = styled.label`
  font-size: 0.85rem;
  margin-bottom: -2.1vh;
  margin-left: 1.8vw;
  color: #05386b;
`

// ** Choose Image Button ** //
export const ImageUploadDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const FileName = styled.p`
  color: #05386b;
`

export const ImageUpload = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  width: fit-content;
  padding: 5px 7px;
  font-size: 0.73rem;
  border-radius: 10px;
  color: #edf5e1;
  background:#05386b;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
  }
`

export const ImageInput = styled.input`
  display: none;
`

export const PreviewSrc = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 90%;
`

export const CreateListingButton = styled.button`
  font-family: 'Open Sans', sans-serif;
  width: fit-content;
  margin: -0.5vh auto 0 auto;
  color: #edf5e1;
  background: #05386b;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 2px 1px rgba(5, 56, 107, 0.4);
  font-size: 1rem;
  padding: 5px 7px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`