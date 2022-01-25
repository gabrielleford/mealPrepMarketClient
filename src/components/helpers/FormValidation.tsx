import { Props as SignupProps } from '../auth/Signup'

export type Props = {
  firstName: SignupProps['firstName'],
  lastName: SignupProps['lastName'],
  email: SignupProps['email'],
  password: SignupProps['password'],
  confirmPassword: SignupProps['confirmPassword'],
  firstNameErr: SignupProps['firstNameErr'],
  lastNameErr: SignupProps['lastNameErr'],
  emailErr: SignupProps['firstNameErr'],
  emailRegex: SignupProps['emailRegex'],
  passErr: SignupProps['firstNameErr'],
  passRegex: SignupProps['passRegex'],
  confirmPassErr: SignupProps['firstNameErr']
}

export function signupValidation ({firstName, lastName, email, password, confirmPassword,firstNameErr, lastNameErr, emailErr, emailRegex, passErr, passRegex ,confirmPassErr}:Props) {
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  
  passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
  if (!firstName) {
    firstNameErr = 'First name required'
  }

  if (firstName.length < 3) {
    firstNameErr = 'First name must be at least 3 characters';
  } else if (firstName.length > 50) {
    firstNameErr = 'First name must be less than 50 characters';
  }

  if (!lastName) {
    lastNameErr = 'Last name required'
  }

  if (lastName.length < 3) {
    lastNameErr = 'Last name must be at least 3 characters';
  } else if (lastName.length > 50) {
    lastNameErr = 'Last name must be less than 50 characters';
  }

  if (!email) {
    emailErr = 'Email required'
  }

  if (!email.match(emailRegex)) {
    emailErr = 'Invalid email'
  }

  if (!password) {
    passErr = 'Password required'
  }

  if (!password.match(passRegex)) {
    passErr = 'Password must be at least 8 characters long and include 1 number and 1 special character'
  }

  if (password !== confirmPassword) {
    confirmPassErr = 'Passwords do not match'
  }

  // return [firstNameErr, lastNameErr, emailErr, passErr, confirmPassErr]
}

