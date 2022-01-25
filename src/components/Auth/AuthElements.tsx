import { Link } from "react-router-dom";
import styled from "styled-components";

//TODO: Style meal prep button & responsiveness

//-------------------------------------------//


//            ** LOGIN STYLE **             //


//------------------------------------------//
// * Main div * //
export const LoginContainer = styled.div`
  padding: 48px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2000px;
  height: 100vh;
  transition: all 0.3s ease-in-out;
`

// * Wrapper * //
export const LoginWrapper = styled.div`
  width: 25%;
  display: grid;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin: auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
`

// * Login Header * //
export const LoginH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  margin-top: -4vh;
  color: #05386b;
`

// * Form */
export const LoginForm = styled.form`
  display: grid;
  justify-content: center;
  grid-gap: 3vh;
`

// * Input * //
export const LoginInput = styled.input`
  border-radius: 4px;
  border: thin solid #05386b;
`

// * Labels * //
export const LoginLabel = styled.label`
  margin-bottom: -5vh;
  color: #05386b;
`

// * Submit Button * //
export const LoginSubmit = styled.button`
  width: 50%;
  margin: -1.5vh auto 0 auto;
  color: #edf5e1;
  background: #05386b;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px 1px rgba(5, 56, 107, 0.4);
  font-size: 1.1rem;
  padding: 7px 0;

  &:hover {
    color: #05386b;
    background: #5cdb95;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
`

// * New to Meal Prep Market? * // 
export const LoginP = styled.p`
  text-align: center;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`

// * Sign up Here * //
export const LoginRoute = styled(Link)`
  text-align: center;
  margin-top: -2.7vh;

  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`

//-------------------------------------------//


//           ** SIGN UP STYLE **            //


//------------------------------------------//
// * Main Div * //
export const SignupContainer = styled.div`
  padding: 20vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2000px;
  height: 100vh;
  transition: all 0.3s ease-in-out;
`

// * Wrapper * //
export const SignupWrapper = styled.div`
  width: 35vw;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
`

// * Signup Header * //
export const SignupH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  margin-top: -4vh;
  color: #05386b;
`

// * Form */
export const SignupForm = styled.form`
  display: grid;
  justify-content: center;
  grid-gap: 2.5vh;
`

// * Input * //
export const SignupInput = styled.input`
  border-radius: 4px;
  border: thin solid #05386b;
`

// * Labels * //
export const SignupLabel = styled.label`
  margin-bottom: -2.8vh;
  color: #05386b;
`

// * Submit Button * //
export const SignupSubmit = styled.button`
  width: 57%;
  margin: -1.5vh auto 0 auto;
  color: #edf5e1;
  background: #05386b;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px 1px rgba(5, 56, 107, 0.4);
  font-size: 1.1rem;
  padding: 7.5px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
`

// * Already have an account? * // 
export const SignupP = styled.p`
  text-align: center;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`

// * Login Here * //
export const SignupRoute = styled(Link)`
  text-align: center;
  margin-top: -2.7vh;

  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
  }
`

// * Role Button * //
export const RoleBtn = styled.button`
  color: #edf5e1;
  background: #05386b;
  border: none;
  border-radius: 4px;
`