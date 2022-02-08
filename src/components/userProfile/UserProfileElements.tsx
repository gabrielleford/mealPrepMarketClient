import styled from "styled-components";
import { Link } from "react-router-dom";

// ** Profile View ** //
export const ProfileContainer = styled.div`
  margin-top: 11vh;

  @media screen and (max-width: 1407px) and (min-width: 1216px) {
    padding-top: 6vh;
  }

  @media screen and (max-width: 1215px) and (min-width: 1033px) {
    padding-top: 4vh;
  }

  @media screen and (min-width: 769px) {
    margin-top: 17vh;
  }
`

export const ProfileWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const UserInfoDiv = styled.div`
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  background: #05386b;
  padding: 20px 40px;

  @media screen and (max-width: 1407px) and (min-width: 1216px) {
    position: static;
    border-radius: 17px;
    width: 47vw;
    margin: 0 auto;
    padding: 10px 20px;
  }

  @media screen and (max-width: 1215px) and (min-width: 1033px) {
    position: static;
    border-radius: 17px;
    width: 50vw;
    margin: 0 auto;
    padding: 10px 20px;
  }

  @media screen and (max-width: 1032px) and (min-width: 769px) {
    border-radius: 17px;
    width: 70vw;
    margin: 0 auto;
    padding: 10px 20px;
  }
`

export const UserInfo = styled.div`
  color: #edf5e1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 2000px) and (min-width: 769px) {
    flex-direction: row;
  }
`

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  display: block;
  margin: auto;

  @media screen and (max-width: 2000px) and (min-width: 769px) {
    width: 100px;
    height: 100px;
    margin-left: 3.5rem;
  }
`

export const NameDescrip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 2000px) and (min-width: 769px) {
    margin-right: 3rem;
  }
`

export const UserName = styled.h1`
  font-size: 1rem;
  font-weight: 400;

  @media screen and (max-width: 2000px) and (min-width: 769px) {
    font-size: 1.5rem;
  }
`

export const ProfileDescrip = styled.p`
  font-weight: 300;
  font-size: 0.7rem;
  margin-top: -0.5rem;

  @media screen and (max-width: 2000px) and (min-width: 769px) {
    font-size: 1rem;
  }
`

// ** Edit User Info ** //
export const UserData = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const UserP = styled.p`
  
`

export const UpdateForm = styled.form`
  
`

export const UpdateLabel = styled.label`
  
`

export const UpdateInput = styled.input`
  
`

export const UpdateTextarea = styled.textarea`
  
`

export const UpdateDeleteBtn = styled.button`
  
`

export const RouteToAccount = styled(Link)`
  text-decoration: none;
  width: fit-content;
  color: #05386b;
  background: #5cdb95;
  display: block;
  margin: 0 auto;
  padding: 2px 8px 2px 8px;
  border: solid 2px #5cdb95;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px rgba(92, 219, 149, 0.5);
  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #8ee4af;
  }


  @media screen and (max-width: 2000px) and (min-width: 769px) {
    margin-top: 1rem;
    margin-left: 5rem;
  }
`

export const PreviewSrc = styled.img`
  display: block;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`