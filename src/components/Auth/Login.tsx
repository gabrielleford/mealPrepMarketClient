import React from 'react';
import APIURL from '../helpers/environments';
import {AuthContainer, AuthForm, AuthInput, AuthLabel, AuthSubmit, AuthWrapper} from './AuthElements';

type LoginProps = {
  email: string,
  password: string
}

class Login extends React.Component<{}, LoginProps> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: ''
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
    .then(res => res.json())
    .then(json => console.log(json))
  }
  
  render(): React.ReactNode {
      return (
        <AuthContainer>
          <AuthWrapper>
            <AuthForm onSubmit={this.loginUser}>
              <AuthLabel>Email</AuthLabel>
              <AuthInput type='email' name='email' value={this.state.email} onChange={this.handleChange}/>
              <AuthLabel>Password</AuthLabel>
              <AuthInput type='password' name='password' value={this.state.password} onChange={this.handleChange} />
              <AuthSubmit type='submit'>Login</AuthSubmit>
            </AuthForm>
          </AuthWrapper>
        </AuthContainer>
      )
  }
}

export default Login;