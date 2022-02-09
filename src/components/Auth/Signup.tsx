import React from 'react';
import APIURL from '../helpers/environments';
import { Navigate, Link } from 'react-router-dom';
import { AppProps } from '../../App';
import {GoMail} from 'react-icons/go'
import { FiLock } from 'react-icons/fi';
import { BsCheck2, BsEmojiFrown, BsX } from 'react-icons/bs';
import { Alert, Box, Button, Center, Container, Grid, Group, Input, Paper, PasswordInput, Popover, Switch, Text, Title } from '@mantine/core';

function PasswordRequirements({meets, label} : {meets: boolean, label: string}) {
  return (
    <Text sx={{display: 'flex', alignItems: 'center' }} color={meets ? 'green' : 'red'} size='xs'>{meets ? <BsCheck2/> : <BsX/>} <Box>{label}</Box></Text>
  )
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number'},
  { re: /[a-z]/, label: 'Includes lowercase letter'},
  { re: /[A-Z]/, label: 'Includes uppercase letter'},
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes a special character'}
]

const emailRegex:RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

type Role = 'primary' | 'secondary';

export type SignupProps = {
  sessionToken: AppProps['sessionToken'],
  prevPath: AppProps['prevPath'],
  popoverOpen: AppProps['popoverOpen'],
  updateToken: AppProps['updateToken'],
  setSessionToken: AppProps['setSessionToken'],
  setPopoverOpen: AppProps['setPopoverOpen'],
}

export type SignupState = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: Role,
  firstNameErr: boolean,
  lastNameErr: boolean,
  emailErr: boolean,
  passwordErr: boolean,
  confirmPasswordErr: boolean,
  user: string,
  responseCode: number,
  submitted: boolean,
  _isMounted: boolean
}

class Signup extends React.Component<SignupProps, SignupState> {

  constructor(props: SignupProps) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'secondary',
      firstNameErr: false,
      lastNameErr: false,
      emailErr: false,
      passwordErr: false,
      confirmPasswordErr: false,
      user: '',
      responseCode: 0,
      submitted: false,
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.checkPass = this.checkPass.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
    const {name, value} = e.target;
    this.checkValue(name, value);
  }

  checkValue = (name: string, value: string) => {
    switch (name) {
      case 'firstName': 
        value.length < 3 ? this.setState({
          firstNameErr: true
        }) : value.length > 50 ? this.setState({
          firstNameErr: true
        }) : this.setState({
          firstNameErr: false
        })
        break;
      case 'lastName':
        value.length < 3 ? this.setState({
          lastNameErr: true
        }) : value.length > 50 ? this.setState({
          lastNameErr: true
        }) : this.setState({
          lastNameErr: false
        })
        break;
      case 'email':
        emailRegex.test(this.state.email) ? this.setState({
          emailErr: false
        }) : this.setState({
          emailErr: true
        });
        break;
      case 'confirmPassword':
        this.state.confirmPassword !== this.state.password ? this.setState({
          confirmPasswordErr: true
        }) : this.setState({
          confirmPasswordErr: false
        })
      }
  }

  checkPass = () => {
    return(
      requirements.map((requirement:{re: RegExp, label: string}, index) => {
        return(
          <PasswordRequirements key={index} label={requirement.label} meets={requirement.re.test(this.state.password)} />
        )
      })
    )
  }

  changeRole = () => {
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

  registerUser = async ():Promise<void> => {
    this.setState({
      submitted: true
    })
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
        responseCode: res.status,
        submitted: false,
      })
      return res.json()
    })
    .then(json => {
      console.log(json);
      if (this.state.responseCode === 200) {
        this.state._isMounted && this.setState({
          user: json.user.id,
        });
        this.state._isMounted && this.props.updateToken(json.sessionToken);
      }
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
  }

  componentDidUpdate(prevProps:Readonly<SignupProps>, prevState:Readonly<SignupState>) {
    if (this.state.confirmPassword !== prevState.confirmPassword) {
      if (this.state.password !== '') {
        if (this.state.confirmPassword === this.state.password) {
          this.setState({
            confirmPasswordErr: false
          })
        }
      }
    }
    if (this.state.email !== prevState.email) {
      if (emailRegex.test(this.state.email)) {
        this.setState({
          emailErr: false
        })
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
      return (
        <Container classNames='formContainer' mt={150} size={600} padding='lg'>
          <Paper className='form' sx={{paddingTop: 40, paddingBottom: 40, paddingLeft: 75, paddingRight: 75}} mt='xl' shadow='xl' radius='md'>
            <Title align='center' className='formTitle' order={1}>Sign Up</Title>
            <Grid gutter='lg'>
              <Grid.Col>
                <Input className='formInput' name='firstName' placeholder='First Name' radius='md' invalid={this.state.firstNameErr ? true : false} required value={this.state.firstName} onChange={this.handleChange}/>
              </Grid.Col>
              <Grid.Col>
                <Input className='formInput' name='lastName' placeholder='Last Name' radius='md' invalid={this.state.lastNameErr ? true : false} required value={this.state.lastName} onChange={this.handleChange}/>
              </Grid.Col>
              <Grid.Col>
                <Input className='formInput' name='email' type='email' icon={<GoMail/>} placeholder='Email' invalid={this.state.emailErr ? true : false} radius='md' required value={this.state.email} onChange={this.handleChange}/>
              </Grid.Col>
              <Grid.Col>
                <Popover 
                  opened={this.props.popoverOpen}
                  position='bottom'
                  noFocusTrap
                  onFocusCapture={() => this.props.setPopoverOpen(true)}
                  onBlurCapture={() => this.props.setPopoverOpen(false)}
                  target={
                  <PasswordInput className='passInput' name='password' icon={<FiLock/>} placeholder='Password' radius='md' description='Password must be 8 characters long, include at least one uppercase letter, one number, and one special character' required onChange={this.handleChange}/>}
                >
                <PasswordRequirements label='Includes at least 8 characters' meets={this.state.password.length > 7} />
                {this.checkPass()}
                </Popover>
              </Grid.Col>
              <Grid.Col>
                <PasswordInput className='passInput' name='confirmPassword' icon={<FiLock/>}placeholder='Confirm Password' radius='md' required error={this.state.confirmPasswordErr ? 'Passwords don\'t match' : ''} value={this.state.confirmPassword} onChange={this.handleChange}/>
              </Grid.Col>
              <Grid.Col>
                <Group position='center' spacing='xs'>
                  <Text size='sm' sx={{color: '#edf5e1', fontFamily: 'Open Sans, sans-serif'}}>I'm a meal prepper</Text>
                  <Switch color='green' onChange={this.changeRole}/>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Center>
                  <Button className='formButton' radius='md' size='lg' compact loading={this.state.responseCode !== 201 && this.state.submitted ? true : false} onClick={this.registerUser}>Sign Up</Button>
                </Center>
              </Grid.Col>
              <Grid.Col>
                <Center>
                  {this.state.responseCode === 409 ? 
                    <Alert icon={<BsEmojiFrown/>} title='Oops!' color='red' radius='md' withCloseButton onClose={() => this.setState({
                      responseCode: 0
                    })}>Email already in use</Alert> :
                    this.state.responseCode === 500 ?
                    <Alert icon={<BsEmojiFrown/>} title='Sorry' color='red' radius='md' withCloseButton onClose={() => this.setState({
                      responseCode: 0
                    })}>Internal Error</Alert> : 
                    this.state.responseCode === 400 ? 
                    <Alert icon={<BsEmojiFrown/>} title='Oops!' color='red' radius='md' withCloseButton onClose={() => this.setState({
                      responseCode: 0
                    })}>Please complete all fields</Alert> : ''
                  }
                </Center>
              </Grid.Col>
              <Grid.Col>
                <Center>
                  <Text sx={{color: '#edf5e1', fontFamily: 'Open Sans, sans-serif'}}>Already a member?</Text>
                </Center>
                <Center>
                  <Text variant='link' component={Link} to='/login' sx={{color: '#8ee4af', fontFamily: 'Open Sans, sans-serif'}}>Log in here!</Text>
                </Center>
              </Grid.Col>
            </Grid>
          </Paper>
          {this.state.user !== '' && <Navigate to={this.props.prevPath} replace={true}/>}
        </Container>
      )
  }
}

export default Signup;