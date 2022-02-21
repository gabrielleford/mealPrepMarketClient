import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
import UserProfileMap from "./UserProfileMap";
import { Link } from "react-router-dom";
import { Avatar, Button, Card, Center, Container, Group, Paper, Text, Title } from "@mantine/core";

export type UserState = {
  profileOwner: string,
  profileID: string,
  listings: {
    id: string,
    title: string,
    image: string,
    price: number,
    tag: string[],
  }[],
  profilePicture: string,
  profileDescription: string,
  userName: string,
  _isMounted: boolean,
}

type UserProps = {
  user: AppProps['user'],
  mapInfo: AppProps['mapInfo'],
  setDlt: AppProps['setDlt'],
  setEndpointID: AppProps['setEndpointID'],
  setResponse: AppProps['setResponse'],
  setWhat: AppProps['setWhat'],
}

class UserProfile extends React.Component<UserProps, UserState> {
constructor(props: UserProps) {
  super(props)

  this.state = {
    profileOwner: '',
    profileID: window.location.pathname.slice(9, 45),
    listings: [{id: '', title: '', image: '', price: 0, tag: ['']}],
    profilePicture: '',
    profileDescription: '',
    userName: '',
    _isMounted: false,
  }

  this.fetchUserProfile = this.fetchUserProfile.bind(this);
}

fetchUserProfile = async ():Promise<void> => {
  await fetch(`${APIURL}/user/prepper/${this.state.profileID}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => {
    return res.json()})
  .then(res => {;
      this.setState({
      listings: [...res.listings],
      profileOwner: res.id,
      profilePicture: res.profilePicture,
      profileDescription: res.profileDescription,
      userName: `${res.firstName} ${res.lastName}`
    })
  })
  .catch(error => console.log(error))
}

componentDidMount() {
  this.setState({
    _isMounted: true
  });
  if (this.props.mapInfo.listings.length > 0 && this.props.user.userId === this.state.profileID) {
    this.fetchUserProfile();
  } else {
    this.fetchUserProfile();
  }
  this.props.setDlt(false);
  this.props.setEndpointID('');
  this.props.setResponse(0);
  this.props.setWhat('');
}

componentWillUnmount() {
  this.setState({
    _isMounted: false
  });
}

  render(): React.ReactNode {
    return (
      <Container>
        <Card mt={150} radius='lg' sx={{width: '700px', background: '#05386b', marginLeft: 'auto', marginRight: 'auto'}}>
          <Group position="center" spacing={60}>
            <Avatar src={this.state.profilePicture} size={150} radius={75} />
            {(this.props.user.userId === this.state.profileID && this.state.profileDescription === '' ) ?
              <>
              <Group direction="column" position="center">
                <Title sx={{color: '#edf5e1', fontWeight: '400'}}>{this.state.userName}</Title>
                <Text sx={{cursor: 'pointer', color: '#edf5e1'}} component={Link} to={`/user/${this.state.profileOwner}`}>You don't have a description, yet&#128577;</Text>
                <Text sx={{cursor: 'pointer', color: '#edf5e1'}} mt={-10} component={Link} to={`/user/${this.state.profileOwner}`}>Click me to add one!</Text>
              </Group>
              </> :
              this.state.profileDescription.length > 40 && this.state.profileDescription.length < 100 ?
              <Group direction="column" position="center">
                <Title sx={{color: '#edf5e1', fontWeight: '400'}}>{this.state.userName}</Title>
                <Text sx={{maxWidth: '200px', color: '#edf5e1'}}>{this.state.profileDescription}</Text>
              </Group> :
              this.props.user.userId !== this.state.profileID ?
              <Group>
                <Title sx={{color: '#edf5e1', fontWeight: '400'}}>{this.state.userName}</Title>
                <Text sx={{color: '#edf5e1'}}>{this.state.profileDescription}</Text>
              </Group> : ''
            }
          </Group>
          {this.props.user.userId === this.state.profileID &&
            <Center>
              <Button className="formButton" radius='md' component={Link} to={`/user/${this.state.profileOwner}`} compact>Edit My Profile</Button>
            </Center>
          }
        </Card>
        {(this.props.mapInfo.listings.length < 1 && this.props.user.userId === this.state.profileOwner) ? 
          <Paper sx={{background: '#05386b', padding: '40px 50px', margin: '0 auto'}} radius='lg' mt={50}>
            <Center>
              <Title order={1} sx={{fontWeight: '500', color: '#edf5e1'}}>You haven't created any listings, yet!&#128577;</Title>
            </Center>
            <Center>
              <Text mt='lg' size='lg' id='noOrdersText' component={Link} to='/create'>Create your first listing!</Text>
            </Center>
          </Paper>:
          <UserProfileMap listings={this.state.listings}/> 
        }
      </Container>
    )
  }
}

export default UserProfile;