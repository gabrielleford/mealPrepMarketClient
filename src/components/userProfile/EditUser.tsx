import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import APIURL from "../helpers/environments";
import { ButtonDiv } from "../listingById/ListingElements";
import { ProfileContainer, ProfileWrapper, UpdateDeleteBtn, UpdateForm, UpdateInput, UpdateLabel, UpdateTextarea } from "./UserProfileElements";
import ConfirmDelete from '../confirmDelete/ConfirmDelete';

type EditProps = {
  sessionToken: AppProps['sessionToken'],
  userID: AppProps['userID']
  user: AppProps['user'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  userEdit: AppProps['userEdit'],
  setWhat: AppProps['setWhat'],
  setDelete: AppProps['setDelete'],
  setUserEdit: AppProps['setUserEdit'],
  clearToken: AppProps['clearToken'],
  listingID: ListingState['listingID']
}

type EditState = {
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string,
  profileDescription: string,
  profileID: string,
  _isMounted: boolean,
}

class EditUser extends React.Component<EditProps, EditState> {
  constructor(props:EditProps) {
    super(props)

    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      profilePicture: this.props.user.profilePicture,
      profileDescription: this.props.user.profileDescription,
      profileID: window.location.pathname.slice(6, 42),
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  updateUserInfo = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();
    console.log(this.state.profileID);

    await fetch(`${APIURL}/user/${this.state.profileID}`, {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          profilePicture: this.state.profilePicture,
          profileDescription: this.state.profileDescription,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => console.log(res))
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    console.log(this.props.user);
    this.props.setWhat('user');
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
          <ConfirmDelete what={this.props.what} sessionToken={this.props.sessionToken} listingID={this.props.listingID} userID={this.props.userID} setDelete={this.props.setDelete} clearToken={this.props.clearToken} />
        }
        <ProfileWrapper>
          <UpdateForm onSubmit={this.updateUserInfo}>
            {this.props.user.role === 'primary' &&
              <>
              <UpdateLabel>Profile Picture</UpdateLabel>
              <UpdateInput name='profilePicture' value={this.state.profilePicture} />
              <UpdateLabel>Profile Description</UpdateLabel>
              <UpdateTextarea name='profileDescription' value={this.state.profileDescription} onChange={this.handleChange} />
              </>
            }
            <UpdateLabel>First Name</UpdateLabel>
            <UpdateInput name='firstName' value={this.state.firstName} onChange={this.handleChange} />
            <UpdateLabel>Last Name</UpdateLabel>
            <UpdateInput name='lastName' value={this.state.lastName} onChange={this.handleChange} />
            <UpdateLabel>Email</UpdateLabel>
            <UpdateInput name='email' value={this.state.email} onChange={this.handleChange} />
            <ButtonDiv>
            <UpdateDeleteBtn type="submit">Update</UpdateDeleteBtn>
            <UpdateDeleteBtn onClick={() => this.props.setDelete(true)}>Delete Account</UpdateDeleteBtn>
            </ButtonDiv>
          </UpdateForm>
        </ProfileWrapper>
        {
          !this.props.userEdit ? 
          <Navigate to={`/user/${this.state.profileID}`} replace={true} /> :
          !localStorage.getItem('Authorization') ?
          <Navigate to='/' replace={true} /> : ''
        }
      </ProfileContainer>
    )
  }
}

export default EditUser;