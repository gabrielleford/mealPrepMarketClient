import React, { ChangeEvent } from "react";
import APIURL from "../helpers/environments";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { ButtonDiv } from "../listingById/ListingElements";
import { PreviewSrc, ProfileContainer, ProfileWrapper, UpdateDeleteBtn, UpdateForm, UpdateInput, UpdateLabel, UpdateTextarea, FileName, ImageInput, ImageUpload, ImageUploadDiv } from "./UserProfileElements";
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
  file: string,
  profileDescription: string,
  profileID: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  newProfilePic: boolean,
  responseCode: number,
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
      file: '',
      profileDescription: this.props.user.profileDescription,
      profileID: window.location.pathname.slice(6, 42),
      previewSrc: '',
      stringPrvwSrc: '',
      newProfilePic: false,
      responseCode: 0,
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.previewImgSrc = this.previewImgSrc.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderPicture = this.renderPicture.bind(this);
  }

  renderPicture = () => {
    if (this.state.newProfilePic) {
      return (
        <PreviewSrc src={this.state.stringPrvwSrc}/>
      )
    } else {
      return (
        <PreviewSrc src={this.props.user.profilePicture} />
      )
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    })
  }

  handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      file: e.target.value
    })

    var {files} = e.currentTarget;
    if (files && files?.length > 0) {
      this.previewImage(files[0]);
    }
  }

  previewImage = (file: File) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({
      previewSrc: reader.result
      });
    if (this.state.previewSrc !== '') {
      this.previewImgSrc(this.state.previewSrc);
    }
  }

  previewImgSrc = (prvwFile: any) => {
  if (prvwFile) {
    this.setState({
      stringPrvwSrc: Buffer.from(prvwFile).toString(),
      newProfilePic: true,
    })
  }
}

  handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.updateUserInfo(this.state.stringPrvwSrc)
  }

  updateUserInfo = async (encodedImg: string):Promise<void> => {
    var formData = new FormData();
    formData.append('file', encodedImg);
    formData.append('upload_preset', 'MealPrepMarketAvatar');

    var res = await fetch(`https://api.cloudinary.com/v1_1/gabrielleford/image/upload`, {
      method: 'POST',
      body: formData,
    })
    var cloudinary = await res.json();
    console.log(cloudinary);

    await fetch(`${APIURL}/user/${this.state.profileID}`, {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          profilePicture: cloudinary.url,
          profileDescription: this.state.profileDescription,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        this.props.setUserEdit(!this.props.userEdit);
      }
    })
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    console.log(this.props.user);
    this.props.setWhat('user');
  }

  componentDidUpdate(prevProps:Readonly<EditProps>, prevState:Readonly<EditState>){
    if(this.state.previewSrc !== prevState.previewSrc ) {
      this.previewImgSrc(this.state.previewSrc);
    }
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
          <UpdateForm onSubmit={this.handleUpdate}>
            {this.renderPicture()}
            <FileName>{this.state.file}</FileName>
            {this.props.user.role === 'primary' &&
              <>
              <ImageUploadDiv>
                <ImageUpload htmlFor='image'>Update Profile Picture</ImageUpload>
                <ImageInput type='file' id='image' onChange={this.handleImage} value={this.state.file} />
              </ImageUploadDiv>
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
            <UpdateDeleteBtn type="submit">Save</UpdateDeleteBtn>
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