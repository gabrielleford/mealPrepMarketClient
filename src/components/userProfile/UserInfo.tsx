import React, { ChangeEvent } from "react";
import APIURL from "../helpers/environments";
import { Link, Navigate } from "react-router-dom";
import { Buffer } from "buffer";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import ConfirmDelete from '../confirmDelete/ConfirmDelete';
import { Avatar, Button, Card, Center, Container, Grid, Group, Input, Text, Textarea } from "@mantine/core";

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
  editDescription: boolean,
  editName: boolean,
  editEmail: boolean,
  inputVisible: boolean,
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
  goToOrders: boolean,
  _isMounted: boolean,
}

class UserInfo extends React.Component<UserProps, UserState> {
  constructor(props:UserProps) {
    super(props)

    this.state = {
      profileID: window.location.pathname.slice(6, 42),
      goToOrders: false,
      editDescription: false,
      editName: false,
      editEmail: false,
      inputVisible: false,
      role: this.props.user.role,
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
      _isMounted: false,
    }

    this.renderName = this.renderName.bind(this);
    this.renderEmail = this.renderEmail.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.previewImgSrc = this.previewImgSrc.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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
            <Input name="firstName" radius='md' value={this.state.firstName} onChange={this.handleChange}/>
            <Input name='lastName' radius='md' value={this.state.lastName} onChange={this.handleChange} />
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
            <Input name='email' radius='md' value={this.state.email} onChange={this.handleChange}/>
          </Center>
        </Grid.Col>
      )
    }
  }

  renderAvatar = () => {
    if (this.props.user.profilePicture !== '') {
      return (
        <Group direction="column">
          <Avatar className="avatar" size={80} radius={40} src={this.props.user.profilePicture} />
          <Text size="xs">{this.state.file}</Text>
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
        <Textarea name="profileDescription" radius='md' value={this.state.profileDescription} onChange={this.handleChange} />
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
          role: this.state.role,
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
    })
    .catch(error => console.log(error))
  } else {
    await fetch(`${APIURL}/user/${this.state.profileID}`, {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          role: this.state.role,
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
    .then(res => {
      this.setState({
        editDescription: false,
        editName: false,
        editEmail: false,
        inputVisible: false,
      })
      console.log(res)
    })
    .catch(error => console.log(error))
  }
}

  // ** Lifecycle ** //
  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
    this.props.setWhat('user');
    this.props.fetchData();
  }

  componentDidUpdate(prevProps:Readonly<UserProps>, prevState:Readonly<UserState>) {
    if(this.state.previewSrc !== prevState.previewSrc ) {
      this.previewImgSrc(this.state.previewSrc);
    }
    if (this.state.inputVisible !== prevState.inputVisible) {
      this.props.fetchData();
    }
    if (this.state.responseCode !== prevState.responseCode) {
      this.props.fetchData();
    }
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
                <Button className="formButton" size="lg" radius='md' compact >Delete</Button>
                <Button component={Link} to={`/orders/${this.props.user.userId}`} className="formButton" size="lg" radius='md' compact>My Orders</Button>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Center>

              </Center>
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