import React from 'react';
import { AuthContainer, AuthForm, AuthInput, AuthLabel, AuthSubmit, AuthWrapper, RoleBtn } from './AuthElements';

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
  passErr: string,
  confirmPassErr: string
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
      passErr: '',
      confirmPassErr: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  formValidation = () => {
    if (this.state.firstName.length < 3) {
      this.setState({
        firstNameErr: 'Name must be at least 3 characters long.'
      })
    }
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

  registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  render(): React.ReactNode {
      return (
        <AuthContainer>
          <AuthWrapper>
            <AuthForm>
            <h1>Signup</h1>
              <AuthLabel htmlFor='firstName'>First Name</AuthLabel>
              <AuthInput type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
              <AuthLabel htmlFor='lastName'>Last Name</AuthLabel>
              <AuthInput type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
              <AuthLabel htmlFor='email'>Email</AuthLabel>
              <AuthInput type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
              <AuthLabel htmlFor='password'>Password</AuthLabel>
              <AuthInput type='password' name='password' value={this.state.password} onChange={this.handleChange}/><AuthLabel htmlFor='lastName'>Confirm Password</AuthLabel>
              <AuthInput type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange}/>
              <RoleBtn onClick={this.changeRole}>Meal Prepper</RoleBtn>
              <AuthSubmit>Submit</AuthSubmit>
            </AuthForm>
          </AuthWrapper>
        </AuthContainer>
      )
  }
}

export default Signup;
