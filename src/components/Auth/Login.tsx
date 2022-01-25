import React from 'react';
import { Navigate} from 'react-router-dom';
import { AppProps, SetSessionToken as SetToken} from '../../App';
import APIURL from '../helpers/environments';
import {LoginContainer, LoginForm, LoginH1, LoginInput, LoginLabel, LoginP, LoginRoute, LoginSubmit, LoginWrapper} from './AuthElements';

//TODO: Need to set up form validation

export type SetSessionToken = {
  setSessionToken: SetToken
}

export type LoginProps = {
  email: string,
  password: string,
  loginErr: string,
  responseCode: number,
  sessionToken: AppProps['sessionToken']
  updateToken: AppProps['updateToken']
  setSessionToken: AppProps['setSessionToken']
}

class Login extends React.Component<{sessionToken: string | null, updateToken: (newToken: string) => void, setSessionToken: (sessionToken: string | null) => void}, LoginProps> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginErr: '',
      responseCode: 0,
      sessionToken: '',
      setSessionToken: (sessionToken: string | null) => {},
      updateToken: (newToken: string) => {},
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => {
      console.log(res);
      res.json()
      this.setState({
        responseCode: res.status
      })
    })
    .then(json => {
      console.log(json)
    })
  }
  
  render(): React.ReactNode {
      return (
        <LoginContainer>
          <LoginWrapper>
            <LoginH1>Login</LoginH1>
            <LoginForm onSubmit={this.loginUser}>
              <LoginLabel>Email</LoginLabel>
              <LoginInput type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
              <LoginLabel>Password</LoginLabel>
              <LoginInput type='password' name='password' value={this.state.password} onChange={this.handleChange} />
              <LoginSubmit type='submit'>Login</LoginSubmit>
            </LoginForm>
            <LoginP>New to Meal Prep Market?</LoginP>
            <LoginRoute to='/register'>Sign up here!</LoginRoute>
          </LoginWrapper>
          {this.state.responseCode === 201 && <Navigate to='/' replace={true} />}
        </LoginContainer>
      )
  }
}

export default Login;