import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import APIURL from '../helpers/environments';
import { SignupContainer, SignupForm, SignupInput, SignupLabel, SignupSubmit, SignupWrapper, RoleBtn } from './AuthElements';
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
  responseCode: number,
}

class Signup extends React.Component<{}, Props> {
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
      responseCode: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
    // signupValidation(this.state)
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
    .then(res => {
      this.setState({
        responseCode: res.status
      })
      res.json()
    })
    .then(json => {
      console.log(json)
    })
  }

  render(): React.ReactNode {
      return (
        <SignupContainer>
          <SignupWrapper>
            <SignupForm onSubmit={this.registerUser}>
            <h1>Signup</h1>
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
            <Link to='/login'>Already a member? Login!</Link>
            {this.state.responseCode === 201 && <Navigate to='/' replace={true} />}
          </SignupWrapper>
        </SignupContainer>
      )
  }
}

export default Signup;
