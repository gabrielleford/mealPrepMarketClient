import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { ButtonDiv } from "../listingById/ListingElements";
import { PreviewSrc, ProfileContainer, ProfileWrapper, UpdateDeleteBtn, UserData, UserP } from "./UserProfileElements";
import Avatar from '../../assets/BlankAvatar.png';
import ConfirmDelete from '../confirmDelete/ConfirmDelete';

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
  _isMounted: boolean,
}

class UserInfo extends React.Component<UserProps, UserState> {
  constructor(props:UserProps) {
    super(props)

    this.state = {
      profileID: window.location.pathname.slice(6, 42),
      _isMounted: false,
    }

    this.editUser = this.editUser.bind(this);
  }

  renderPicture = () => {
    if (this.props.user.profilePicture !== '') {
      return (
        <PreviewSrc src={this.props.user.profilePicture} />
      )
    } else {
      return(
        <PreviewSrc src={Avatar} />
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
        <></>
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
    console.log(this.props.user);
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
      <ProfileContainer>
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
            </ButtonDiv>
          </UserData>
        </ProfileWrapper>
        {
          this.props.userEdit ? 
          <Navigate to={`/edit/${this.state.profileID}`} replace={true} /> :
          !localStorage.getItem('Authorization') ?
          <Navigate to='/' replace={true} /> : ''
        }
      </ProfileContainer>
    )
  }
}

export default UserInfo;