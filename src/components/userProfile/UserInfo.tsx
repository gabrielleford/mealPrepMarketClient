import React from "react";
import { Link, Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { ButtonDiv } from "../listingById/ListingElements";
import { PreviewSrc, ProfileContainer, ProfileWrapper, UpdateDeleteBtn, UserData, UserP } from "./UserProfileElements";
import ConfirmDelete from '../confirmDelete/ConfirmDelete';
import { Avatar, Button, Card, Center, Container, Grid, Group, Text } from "@mantine/core";

type UserProps = {
  user: AppProps['user'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  userEdit: AppProps['userEdit'],
  sessionToken: AppProps['sessionToken'],
  response: AppProps['response'],
  listingID: ListingState['listingID'],
  setWhat: AppProps['setWhat'],
  setDelete: AppProps['setDelete'],
  setUserEdit: AppProps['setUserEdit'],
  fetchData: AppProps['fetchData'],
  clearToken: AppProps['clearToken'],
  setResponse: AppProps['setResponse'],
}

type UserState = {
  profileID: string,
  goToOrders: boolean,
  _isMounted: boolean,
}

class UserInfo extends React.Component<UserProps, UserState> {
  constructor(props:UserProps) {
    super(props)

    this.state = {
      profileID: window.location.pathname.slice(6, 42),
      goToOrders: false,
      _isMounted: false,
    }

    this.editUser = this.editUser.bind(this);
  }

  renderPicture = () => {
    if (this.props.user.profilePicture !== '') {
      return (
        <Avatar size={70} radius={35} src={this.props.user.profilePicture} />
      )
    } else {
      return(
        <Avatar size={70} radius={35} />
      )
    }
  }

  renderDescription = () => {
    if (this.props.user.profileDescription !== '') {
      return (
        <UserP>{this.props.user.profileDescription}</UserP>
      )
    } else {
      return (
        <Text>You don't have a description, yet!&#128577; Click here to add one.</Text>
      )
    }
  }

  editUser = () => {
    this.props.setUserEdit(!this.props.userEdit);
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    this.props.setWhat('user');
    this.props.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  render(): React.ReactNode {
    return (
      <Container id='userInfo'>
        {this.props.dlt && 
          <ConfirmDelete what={this.props.what} dlt={this.props.dlt} sessionToken={this.props.sessionToken} listingID={this.props.listingID} user={this.props.user} setDelete={this.props.setDelete} clearToken={this.props.clearToken} response={this.props.response} setResponse={this.props.setResponse} />
        }
        <Card id="userCard" radius='lg' sx={{padding: '60px 0', width: '90%', margin: 'auto'}}>
          <Grid sx={{color: '#edf5e1', margin: 'auto'}}>
            <Grid.Col>
              {this.props.user.role === 'primary' && this.renderPicture()}
              {this.props.user.role === 'primary' && this.renderDescription()}
              <Group position="center">
                <Text size="xl">{this.props.user.firstName}</Text>
                <Text size="xl">{this.props.user.lastName}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Center>
                <Text size="xl">{this.props.user.email}</Text>
              </Center>
            </Grid.Col>
            <Grid.Col>
              <Group mt='lg' position="center">
                <Button className="formButton" size="lg" radius='md' compact onClick={this.editUser}>Update</Button>
                <Button className="formButton" size="lg" radius='md' compact onClick={() => this.props.setDelete(true)}>Delete</Button>
                <Button component={Link} to={`/orders/${this.props.user.userId}`} className="formButton" size="lg" radius='md' compact>My Orders</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
        {
          this.props.userEdit ? 
          <Navigate to={`/edit/${this.state.profileID}`} replace={true} /> :
          !localStorage.getItem('Authorization') ?
          <Navigate to='/' replace={true} /> : ''
        }
      </Container>
    )
  }
}

export default UserInfo;
{/* <ProfileContainer>
{this.props.dlt && 
  <ConfirmDelete what={this.props.what} dlt={this.props.dlt} sessionToken={this.props.sessionToken} listingID={this.props.listingID} user={this.props.user} setDelete={this.props.setDelete} clearToken={this.props.clearToken} response={this.props.response} setResponse={this.props.setResponse} />
}
<ProfileWrapper>
  <UserData>
    {this.props.user.role === 'primary' && this.renderPicture()}
    {this.props.user.role === 'primary' && this.renderDescription()}
    <UserP><b>Name</b>: {this.props.user.firstName} {this.props.user.lastName}</UserP>
    <UserP><b>Email</b>: {this.props.user.email}</UserP>
    <ButtonDiv>
      <UpdateDeleteBtn onClick={this.editUser}>Update</UpdateDeleteBtn>
      <UpdateDeleteBtn onClick={() => this.props.setDelete(true)}>Delete Account</UpdateDeleteBtn>
      <Link to={`/orders/${this.props.user.userId}`}>My Orders</Link>
    </ButtonDiv>
  </UserData>
</ProfileWrapper>
{
  this.props.userEdit ? 
  <Navigate to={`/edit/${this.state.profileID}`} replace={true} /> :
  !localStorage.getItem('Authorization') ?
  <Navigate to='/' replace={true} /> : ''
}
</ProfileContainer> */}