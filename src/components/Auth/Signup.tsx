import React from 'react';
import { Navigate } from 'react-router-dom';
import APIURL from '../helpers/environments';
import { AppProps } from '../../App';
import { SignupContainer, SignupForm, SignupInput, SignupLabel, SignupSubmit, SignupWrapper, RoleBtn, SignupRoute, SignupP, SignupH1 } from './AuthElements';
// import { signupValidation } from '../helpers/FormValidation';

//TODO: Need to set up form validation
//TODO: Finish styling

type Role = 'primary' | 'secondary';

export type Props = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: Role,
  firstNameErr: string,
  lastNameErr: string,
  emailErr: string,
  emailRegex: RegExp,
  passErr: string,
  passRegex: RegExp,
  confirmPassErr: string,
  user: string,
  sessionToken: AppProps['sessionToken']
  updateToken: AppProps['updateToken']
  setSessionToken: AppProps['setSessionToken']
}

class Signup extends React.Component<{
  sessionToken: AppProps['sessionToken'], 
  updateToken: AppProps['updateToken'], 
  setSessionToken: AppProps['setSessionToken']}, Props> {

  constructor(props: Props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'secondary',
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      emailRegex: /()/,
      passErr: '',
      passRegex: /()/,
      confirmPassErr: '',
      user: '',
      sessionToken: this.props.sessionToken,
      setSessionToken: this.props.setSessionToken,
      updateToken: this.props.updateToken,
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  changeRole = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(this.state.role === 'primary') {
      this.setState({
        role: 'secondary'
      })
    } else {
      this.setState({
        role: 'primary'
      })
    }
  }

  registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${APIURL}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          role: this.state.role,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
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
        <SignupContainer>
          <SignupWrapper>
            <SignupH1>Sign Up</SignupH1>
            <SignupForm onSubmit={this.registerUser}>
              <SignupLabel htmlFor='firstName'>First Name</SignupLabel>
              <SignupInput type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
              <SignupLabel htmlFor='lastName'>Last Name</SignupLabel>
              <SignupInput type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
              <SignupLabel htmlFor='email'>Email</SignupLabel>
              <SignupInput type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
              <SignupLabel htmlFor='password'>Password</SignupLabel>
              <SignupInput type='password' name='password' value={this.state.password} onChange={this.handleChange}/><SignupLabel htmlFor='lastName'>Confirm Password</SignupLabel>
              <SignupInput type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange}/>
              <RoleBtn onClick={this.changeRole}>Meal Prepper</RoleBtn>
              <SignupSubmit type='submit'>Submit</SignupSubmit>
            </SignupForm>
            <SignupP>Already a member?</SignupP>
            <SignupRoute to='/login'>Login here!</SignupRoute>
          </SignupWrapper>
        </SignupContainer>
      )
  }
}

export default Signup;