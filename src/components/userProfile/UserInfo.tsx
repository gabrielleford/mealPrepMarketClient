import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { Card, Container } from "@mantine/core";
import EditUser from "./EditUser";

export type UserProps = {
  user: AppProps['user'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  sessionToken: AppProps['sessionToken'],
  response: AppProps['response'],
  endpointID: AppProps['endpointID'],
  setWindowPath: AppProps['setWindowPath'],
  setEndpointID: AppProps['setEndpointID'],
  setWhat: AppProps['setWhat'],
  clearToken: AppProps['clearToken'],
  setResponse: AppProps['setResponse'],
  setDlt: AppProps['setDlt'],
  setUser: AppProps['setUser'],
}

export type UserState = {
  profileID: string,
  role: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string,
  file: string,
  profileDescription: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  newProfilePic: boolean,
  responseCode: number,
  editDescription: boolean,
  editName: boolean,
  editEmail: boolean,
  goToOrders: boolean,
  _isMounted: boolean,
}

class UserInfo extends React.Component<UserProps, UserState> {
  constructor(props:UserProps) {
    super(props)

    this.state = {
      profileID: window.location.pathname.slice(6, 42),
      role: this.props.user.role,
      goToOrders: false,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      profilePicture: this.props.user.profilePicture,
      file: '',
      profileDescription: this.props.user.profileDescription,
      previewSrc: '',
      stringPrvwSrc: '',
      newProfilePic: false,
      responseCode: 0,
      editDescription: false,
      editName: false,
      editEmail: false,
      _isMounted: false,
    }

    this.renderComponent = this.renderComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name !== 'image') {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      })
    }
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

  renderComponent = () => {
    return (
    <Container id='userInfo'>
      <Card id="userCard" radius='lg' sx={{padding: '60px 0', width: '90%', margin: 'auto'}}>
        <EditUser app={{...this.props}} changeRole={this.changeRole} handleChange={this.handleChange} userState={{...this.state}} />
      </Card>
      {
        !localStorage.getItem('Authorization') &&
        <Navigate to='/' replace={true} />
      }
    </Container>
    )
  }

  // ** Lifecycle ** //
  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    this.props.setWhat('user');
    this.props.setWindowPath('user')
  }

  componentDidUpdate(prevProps:Readonly<UserProps>, prevState:Readonly<UserState>) {
    if (this.props.user.userId !== prevProps.user.userId && this.props.user.userId !== '') {
      this.renderComponent()
      this.setState({
        role: this.props.user.role,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        profilePicture: this.props.user.profilePicture,
        profileDescription: this.props.user.profileDescription,
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: '',
      profileDescription: '',
      _isMounted: false,
    });
  }

  render(): React.ReactNode {
    return (
      <>  
        {this.renderComponent()}
      </>
    )
  }
}

export default UserInfo;