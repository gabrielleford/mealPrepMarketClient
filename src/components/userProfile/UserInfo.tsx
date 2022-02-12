import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { Card, Container } from "@mantine/core";
import EditUser from "./EditUser";

export type UserProps = {
  user: AppProps['user'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  sessionToken: AppProps['sessionToken'],
  response: AppProps['response'],
  listingID: ListingState['listingID'],
  setWhat: AppProps['setWhat'],
  clearToken: AppProps['clearToken'],
  setResponse: AppProps['setResponse'],
  setDelete: AppProps['setDelete'],
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
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
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
        <EditUser sessionToken={this.props.sessionToken} user={this.props.user} what={this.props.what} dlt={this.props.dlt} response={this.props.response} setWhat={this.props.setWhat} setDelete={this.props.setDelete} clearToken={this.props.clearToken} setResponse={this.props.setResponse} listingID={this.props.listingID} changeRole={this.changeRole} role={this.state.role} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} profileDescription={this.state.profileDescription} profilePicture={this.state.profileDescription} handleChange={this.handleChange} setUser={this.props.setUser}  />
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