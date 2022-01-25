import React from 'react';
import { Navigate} from 'react-router-dom';
import { AppProps, SetSessionToken as SetToken} from '../../App';
import APIURL from '../helpers/environments';
import {LoginContainer, LoginForm, LoginH1, LoginInput, LoginLabel, LoginP, LoginRoute, LoginSubmit, LoginWrapper} from './AuthElements';

//TODO: Need to set up form validation & make responsive

export type SetSessionToken = {
  setSessionToken: SetToken
}

export type LoginProps = {
  email: string,
  password: string,
  loginErr: string,
  user: string,
  sessionToken: AppProps['sessionToken']
  updateToken: AppProps['updateToken']
  setSessionToken: AppProps['setSessionToken']
}

class Login extends React.Component<{
  sessionToken: AppProps['sessionToken'], 
  updateToken: AppProps['updateToken'], 
  setSessionToken: AppProps['setSessionToken']
}, LoginProps> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginErr: '',
      user: '',
      sessionToken: this.props.sessionToken,
      setSessionToken: this.props.setSessionToken,
      updateToken: this.props.updateToken,
    }

    this.handleChange = this.handleChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  // ** FETCH ** //
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
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        user: json.user.id
      })
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
        </LoginContainer>
      )
  }
}

export default Login;