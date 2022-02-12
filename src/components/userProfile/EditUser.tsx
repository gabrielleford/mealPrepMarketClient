import React, { ChangeEvent } from "react";
import APIURL from "../helpers/environments";
import { Buffer } from "buffer";
import { Link, Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import ConfirmDelete from '../confirmDelete/ConfirmDelete';
import { Avatar, Button, Center, Grid, Group, Input, Text, Textarea } from "@mantine/core";
import { UserState, UserProps } from "./UserInfo";
import UserInfo from "./UserInfo";


type EditProps = {
  role: UserState['role'],
  firstName: UserState['firstName'],
  lastName: UserState['lastName'],
  email: UserState['email'],
  profilePicture: UserState['profilePicture'],
  profileDescription: UserState['profileDescription'],
  handleChange: UserInfo['handleChange']
  changeRole: UserInfo['changeRole']
  sessionToken: UserProps['sessionToken'],
  user: UserProps['user'],
  what: UserProps['what'],
  dlt: UserProps['dlt'],
  response: UserProps['response'],
  setWhat: UserProps['setWhat'],
  setDelete: UserProps['setDelete'],
  clearToken: UserProps['clearToken'],
  setResponse: UserProps['setResponse'],
  listingID: ListingState['listingID']
}

type EditState = {
  file: string,
  profileID: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  newProfilePic: boolean,
  responseCode: number,
  editDescription: boolean,
  editName: boolean,
  editEmail: boolean,
  inputVisible: boolean,
  _isMounted: boolean,
}

class EditUser extends React.Component<EditProps, EditState> {
  constructor(props:EditProps) {
    super(props)

    this.state = {
      file: '',
      profileID: window.location.pathname.slice(6, 42),
      previewSrc: '',
      stringPrvwSrc: '',
      newProfilePic: false,
      responseCode: 0,
      inputVisible: false,
      editDescription: false,
      editName: false,
      editEmail: false,
      _isMounted: false,
    }

    this.renderName = this.renderName.bind(this);
    this.renderEmail = this.renderEmail.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.previewImgSrc = this.previewImgSrc.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

    // ** Render user info & switch to input on click ** //
    renderName = () => {
      if (!this.state.editName) {
        return (
          <Grid.Col>
              <Group position="center">
                <Text sx={{cursor: 'pointer'}} size="xl" onClick={() => this.setEdit('name')}>{this.props.user.firstName}</Text>
                <Text sx={{cursor: 'pointer'}} size="xl" onClick={() => this.setEdit('name')}>{this.props.user.lastName}</Text>
              </Group>
          </Grid.Col>
        )
      } else {
        return (
          <Grid.Col>
            <Group position="center">
              <Input name="firstName" radius='md' value={this.props.firstName} onChange={this.props.handleChange}/>
              <Input name='lastName' radius='md' value={this.props.lastName} onChange={this.props.handleChange} />
            </Group>
          </Grid.Col>
        )
      }
    }
  
    renderEmail = () => {
      if (!this.state.editEmail) {
        return (
          <Grid.Col>
            <Center>
              <Text sx={{cursor: 'pointer'}} onClick={() => this.setEdit('email')}>{this.props.user.email}</Text>
            </Center>
          </Grid.Col>
        )
      } else {
        return (
          <Grid.Col>
            <Center>
              <Input name='email' radius='md' value={this.props.email} onChange={this.props.handleChange}/>
            </Center>
          </Grid.Col>
        )
      }
    }
  
    renderAvatar = () => {
      if (this.props.user.profilePicture !== '') {
        return (
          <Group direction="column">
            <label>
              {this.state.stringPrvwSrc ? 
                <Avatar className="avatar" src={this.state.stringPrvwSrc} size={80} radius={40} /> :
                <Avatar className="avatar" size={80} radius={40} src={this.props.user.profilePicture} />
              }
            </label>
            <input id='image' type='file' value={this.state.file} className="avatarInput" onChange={this.handleImage} />
            <Text size="xs">{this.state.file.replace('C:\\fakepath\\', '')}</Text>
          </Group>
        )
      } else {
        return(
          <Group direction="column" position="center">
            <label className="avatarLabel" htmlFor="image">
              {this.state.stringPrvwSrc ?
              <Avatar className="avatar" src={this.state.stringPrvwSrc} size={80} radius={40} /> :
              <Avatar className="avatar" color='primary' size={80} radius={40} />}
            </label>
            <input id='image' type='file' value={this.state.file} className="avatarInput" onChange={this.handleImage} />
            <Text size="xs">{this.state.file.replace('C:\\fakepath\\', '')}</Text>
          </Group>
        )
      }
    }
  
    renderDescription = () => {
      if (!this.state.editDescription) {
        if (this.props.user.profileDescription !== '') {
          return (
            <Text sx={{cursor: 'pointer'}} onClick={() => this.setEdit('description')}>{this.props.user.profileDescription}</Text>
          )
        } else {
          return (
            <Group direction="column" position="center">
              <Text sx={{cursor: 'pointer'}} onClick={() => this.setEdit('description')}>You don't have a description, yet&#128577;</Text>
              <Text sx={{cursor: 'pointer'}} mt={-10} onClick={() => this.setEdit('description')}>Click me to add one!</Text>
            </Group>
          )
        }
      } else {
        return(
          <Textarea name="profileDescription" radius='md' value={this.props.profileDescription} onChange={this.props.handleChange} />
        )
      }
    }
  
    setEdit = (name: string) => {
      switch(name) {
        case 'name':
          this.setState({
            editName: !this.state.editName,
            inputVisible: true,
          })
          break;
        case 'email':
          this.setState({
            editEmail: !this.state.editEmail,
            inputVisible: true,
          })
          break;
        case 'description':
          this.setState({
            editDescription: !this.state.editDescription,
            inputVisible: true,
          })
          break;
        default:
          this.setState({
            editDescription: false,
            editEmail: false,
            editName: false,
            inputVisible: false,
          })
      }
    }
  
    cancelEdit = () => {
      this.setState({
        editDescription: false,
        editEmail: false,
        editName: false,
        inputVisible: false,
        file: '',
      })
    }

  // ** Logic for updating user info ** //
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
      inputVisible: true,
    })
  }
}

handleUpdate = () => {
  this.updateUserInfo(this.state.stringPrvwSrc)
}

updateUserInfo = async (encodedImg: string):Promise<void> => {
  if (this.props.user.role === 'primary' && this.state.newProfilePic) {
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
          role: this.props.role,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          profilePicture: cloudinary.url,
          profileDescription: this.props.profileDescription,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  } else {
    await fetch(`${APIURL}/user/${this.state.profileID}`, {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          role: this.props.role,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          profilePicture: this.props.profilePicture,
          profileDescription: this.props.profileDescription,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      this.setState({
        editDescription: false,
        editName: false,
        editEmail: false,
        inputVisible: false,
      })
      console.log(res)
      return res.json()
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
}

componentDidMount() {

}

componentDidUpdate(prevProps:Readonly<EditProps>, prevState:Readonly<EditState>) {
  if(this.state.previewSrc !== prevState.previewSrc ) {
    this.previewImgSrc(this.state.previewSrc);
  }
  if (this.props.user.userId !== prevProps.user.userId && this.props.firstName !== prevProps.firstName) {
    this.renderComponent();
  }
  if (this.state.inputVisible !== prevState.inputVisible) {
    this.renderComponent();
  }
}

  renderComponent = () => {
    return (
      <Grid sx={{color: '#edf5e1', margin: 'auto'}}>
      {this.props.user.role === 'primary' && 
        <Grid.Col>
          <Group position="center">
            {this.renderAvatar()}
            {this.renderDescription()}
          </Group>
        </Grid.Col>
      }
      {this.renderName()}
      {this.renderEmail()}
      {this.state.inputVisible && 
        <Grid.Col>
          <Group mt='sm' position="center">
            <Button onClick={this.handleUpdate} className="formButton" size="sm" radius='md' compact >Save Changes</Button>
            <Button onClick={this.cancelEdit} className='formButton' size="sm" radius='md' compact>Cancel</Button>
          </Group>
        </Grid.Col>
      }
      <Grid.Col>
        <Group mt='lg' position="center">
          <Button className="formButton" size="lg" radius='md' compact onClick={() => this.props.setDelete(true)}>Delete</Button>
          <Button component={Link} to={`/orders/${this.props.user.userId}`} className="formButton" size="lg" radius='md' compact>My Orders</Button>
        </Group>
      </Grid.Col>
      <Grid.Col>
        <Center>

        </Center>
      </Grid.Col>
        {this.props.dlt && 
          <ConfirmDelete what={this.props.what} dlt={this.props.dlt} sessionToken={this.props.sessionToken} listingID={this.props.listingID} user={this.props.user} setDelete={this.props.setDelete} clearToken={this.props.clearToken} response={this.props.response} setResponse={this.props.setResponse} />
        }
    </Grid>
    )
  }

  render(): React.ReactNode {
    return (
      <>
        {this.renderComponent()}
      </>
    )
  }
}

export default EditUser;

