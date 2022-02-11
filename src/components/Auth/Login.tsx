import React from 'react';
import APIURL from '../helpers/environments';
import { Navigate, Link } from 'react-router-dom';
import { AppProps } from '../../App';
import {GoMail} from 'react-icons/go'
import { FiLock } from 'react-icons/fi';
import { BsEmojiDizzy, BsEmojiFrown } from 'react-icons/bs';
import { Alert, Button, Center, Container, Grid, Input, Paper, PasswordInput, Space, Text, Title } from '@mantine/core';

export type LoginProps = {
  sessionToken: AppProps['sessionToken'],
  prevPath: AppProps['prevPath'],
  updateToken: AppProps['updateToken'],
  setSessionToken: AppProps['setSessionToken'],
}

type LoginState = {
  email: string,
  password: string,
  loginErr: string,
  user: string,
  responseCode: number,
  submitted: boolean,
  _isMounted: boolean,
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginErr: '',
      user: '',
      responseCode: 0,
      submitted: false,
      _isMounted: false,
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
  loginUser = async ():Promise<void> => {
    this.setState({
      submitted: true,
    });

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
      this.setState({
        responseCode: res.status,
        submitted: false,
      })
      return res.json()
    })
    .then(json => {
      console.log(this.state.responseCode);
      if (this.state.responseCode === 201) {
        this.props.updateToken(json.sessionToken);
        this.props.setSessionToken(json.sessionToken)
        this.setState({
          user: json.user.id
        });
      }
    })
    .catch(error => console.log(error))
  }
  
  componentDidMount() {
    this.setState({
      _isMounted: true
    })
  }

  // componentDidUpdate(prevProps:Readonly<LoginProps>, prevState:Readonly<LoginState>) {

  // }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
    return (
      <Container className='formContainer' mt={150} size={600} padding='lg'>
        <Paper className='form' sx={{paddingTop: 40, paddingBottom: 40, paddingLeft: 75, paddingRight: 75}} mt='xl' shadow='xl' radius='md'>
          <Title align='center' className='formTitle' order={1}>Login</Title>
          <Grid gutter='lg'>
            <Grid.Col>
              <Input className='formInput' name='email' placeholder='email' icon={<GoMail/>} radius='md' required onChange={this.handleChange} />
            </Grid.Col>
            <Grid.Col>
              <PasswordInput className='passInput' name='password' icon={<FiLock/>} placeholder='Password' radius='md' required onChange={this.handleChange}/>
            </Grid.Col>
            <Grid.Col>
              <Center>
                <Button className='formButton' radius='md' size='lg' compact loading={this.state.responseCode !== 201 && this.state.submitted ? true : false} onClick={this.loginUser}>Login</Button>
              </Center>
            </Grid.Col>
            <Grid.Col>
              <Center>
                {this.state.responseCode === 401 ? 
                  <Alert icon={<BsEmojiDizzy/>} title='Oops!' color='red' radius='md' withCloseButton
                  onClose={() => this.setState({
                    responseCode: 0
                  })}>Email or password incorrect</Alert> :
                  this.state.responseCode === 500 ?
                  <Alert icon={<BsEmojiFrown/>} title='Sorry' color='red' radius='md' withCloseButton onClose={() => this.setState({
                    responseCode: 0
                  })}>Internal Error</Alert> : ''
                }
              </Center>
            </Grid.Col>
            <Grid.Col>
              <Center>
                <Text sx={{color: '#edf5e1', fontFamily: 'Open Sans, sans-serif'}}>New to Meal Prep Market?</Text>
              </Center>
              <Center>
                <Text variant='link' component={Link} to='/register' sx={{color: '#8ee4af', fontFamily: 'Open Sans, sans-serif'}}>Sign up here!</Text>
              </Center>
            </Grid.Col>
          </Grid>
        </Paper>
        {this.state.user !== '' && <Navigate to={this.props.prevPath} replace={true}/>}
      </Container>
    )
  }
}

export default Login;