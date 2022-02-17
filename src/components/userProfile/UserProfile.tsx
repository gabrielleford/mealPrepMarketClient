import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
import UserProfileMap from "./UserProfileMap";
import { Link } from "react-router-dom";
import { Avatar, Button, Card, Center, Container, Group, Text } from "@mantine/core";

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
    console.log(res)
    return res.json()})
  .then(res => {
    console.log(res);
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
  console.log(APIURL);
  this.fetchUserProfile();
}

componentWillUnmount() {
  this.setState({
    _isMounted: false
  });
}

  render(): React.ReactNode {
    return (
      <Container>
        <Card mt='lg' radius='md' sx={{width: '700px', background: '#05386b'}}>
          <Group position="center" spacing={60}>
            <Avatar src={this.state.profilePicture} size={150} radius={75} />
            {(this.props.user.userId === this.state.profileOwner && this.state.profileDescription === '' ) ?
              <Group direction="column" position="center">
                <Text sx={{cursor: 'pointer'}} component={Link} to={`/user/${this.state.profileOwner}`}>You don't have a description, yet&#128577;</Text>
                <Text sx={{cursor: 'pointer'}} mt={-10} component={Link} to={`/user/${this.state.profileOwner}`}>Click me to add one!</Text>
              </Group> :
              this.state.profileDescription.length > 40 && this.state.profileDescription.length < 100 ?
              <Text sx={{maxWidth: '200px', color: '#edf5e1'}}>{this.state.profileDescription}</Text> :
              <Text sx={{color: '#edf5e1'}}>{this.state.profileDescription}</Text>
            }
          </Group>
          {this.props.user.userId === this.state.profileOwner &&
            <Center>
              <Button className="formButton" radius='md' component={Link} to={`/user/${this.state.profileOwner}`} compact>Edit My Profile</Button>
            </Center>
          }
        </Card>
        <UserProfileMap listings={this.state.listings}/>
      </Container>
    )
  }
}

export default UserProfile;