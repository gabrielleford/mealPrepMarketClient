import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
import { ListingCards, RouteLink } from "../ReusableElements";
import { NameDescrip, ProfileContainer, ProfileDescrip, ProfilePic, ProfileWrapper, RouteToAccount, UserInfo, UserInfoDiv, UserName } from "./UserProfileElements";
import UserProfileMap from "./UserProfileMap";
import { Navigate } from "react-router-dom";

export type UserState = {
  profileOwner: string,
  profileID: string,
  listings: {
    id: string,
    title: string,
    image: string,
    price: number,
    tag: string,
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
    listings: [{id: '', title: '', image: '', price: 0, tag: ''}],
    profilePicture: '',
    profileDescription: '',
    userName: '',
    _isMounted: false,
  }

  this.fetchUserProfile = this.fetchUserProfile.bind(this);
}

fetchUserProfile = async ():Promise<void> => {
  await fetch(`${APIURL}/user/${this.state.profileID}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    this.state._isMounted && this.setState({
      listings: [...res.listings],
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
  this.fetchUserProfile();
}

componentWillUnmount() {
  this.setState({
    _isMounted: false
  });
}

  render(): React.ReactNode {
    return (
      <ProfileContainer>
        <ProfileWrapper>
          <UserInfoDiv>
            <UserInfo>
              {this.state.profilePicture !== '' && <ProfilePic src={this.state.profilePicture} />}
              <NameDescrip>
                <UserName>{this.state.userName}</UserName>
                <ProfileDescrip>{this.state.profileDescription}</ProfileDescrip>
              </NameDescrip>
            </UserInfo>
            {this.props.user.userId === this.state.profileID && <RouteToAccount to={`/edit/${this.state.profileID}`}>Edit</RouteToAccount>}
          </UserInfoDiv>
          <ListingCards>
            <UserProfileMap listings={this.state.listings}/>
          </ListingCards>
        </ProfileWrapper>
      </ProfileContainer>
    )
  }
}

export default UserProfile;