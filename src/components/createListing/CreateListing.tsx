import React, { ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { CreateContainer, CreateForm, CreateH1, CreateInput, CreateLabel, CreatePostButton, CreateWrapper, PreviewSrc } from "./CreateListingElements";

//TODO: Make component that runs preview image source & conditionally renders that component
//TODO: Style for responsiveness

export type CreateProps = {
  title: string,
  image: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  file: {},
  description: string,
  price: number,
  tags: string,
  reader: FileReader,
  responseCode: number,
  isLoggedIn: AppProps['isLoggedIn'],
  sessionToken: AppProps['sessionToken']
}

class CreatePost extends React.Component<{
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn']
}, CreateProps> {
  constructor(props: CreateProps) {
    super(props)

    this.state = {
      title: '',
      image: '',
      previewSrc: '',
      stringPrvwSrc: '',
      file: {},
      description: '',
      price: 0,
      tags: '',
      reader: new FileReader(),
      responseCode: 0,
      isLoggedIn: this.props.isLoggedIn,
      sessionToken: this.props.sessionToken
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    // this.previewImg = this.previewImg.bind(this);
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      image: e.target.value
    })
    // //! This returns a FileList
    // console.log(e.target.files);
    // console.log(typeof e.target.files);
    // if (typeof e.target.files === 'object' && e.target.files !== null) {
    //   this.setState({
    //     file: e.target.files[0]
    //   })
    //   //! This is returning null even though there are files and I'm setting files[0] to file
    //   console.log(e.target.files[0]);
    //   console.log(this.state.file);
    // } else {}
    // if (this.state.file) {
    //   console.log('hitting this login')
    //   this.state.reader.readAsDataURL(this.state.file)
    //   this.state.reader.onload = () => {
    //     this.setState({
    //       previewSrc: this.state.reader.result
    //     })
    //     console.log(this.state.previewSrc);
    //   }
    //   this.previewImg(this.state.previewSrc)
    // }
  }

  // previewImg = (prvwFile: any) => {
  //     console.log('hitting this second piece logic')
  //   if (typeof prvwFile !== 'string' && prvwFile) {
  //     this.setState({
  //       stringPrvwSrc: Buffer.from(prvwFile).toString()
  //     })
  //     console.log(this.state.stringPrvwSrc)
  //   }
  // }

  postListing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`${APIURL}/listing/create`, {
      method: "POST",
      body: JSON.stringify({
        listing: {
          title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          price: this.state.price,
          tag: this.state.tags,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => this.setState({
      responseCode: res.status
    }))
  }
  
  render(): React.ReactNode {
    return (
      <CreateContainer>
        <CreateWrapper>
          <CreateH1>Create New Listing</CreateH1>
          <CreateForm onSubmit={this.postListing}>
            <CreateLabel>Image</CreateLabel>
            <CreateInput type='file' onChange={this.handleImage} value={this.state.image} /> 
            {/* {this.state.stringPrvwSrc && <img src={this.state.stringPrvwSrc} alt={this.state.title} />} */}
            <CreateLabel>Title</CreateLabel>
            <CreateInput type='text' name="title" onChange={this.handleChange} />
            <CreateLabel>Description</CreateLabel>
            <CreateInput type='text' name="description" onChange={this.handleChange} />
            <CreateLabel>Price</CreateLabel>
            <CreateInput type='text' name="price" onChange={this.handleChange} />
            <CreateLabel>Tags</CreateLabel>
            <CreateInput type='text' name="tags" onChange={this.handleChange} />
            <CreatePostButton>Create Post</CreatePostButton>
          </CreateForm>
        </CreateWrapper>
        {this.state.responseCode === 201 ? <Navigate to='/' replace={true} /> : !this.props.isLoggedIn ? <Navigate to='/' replace={true} /> : ''}
      </CreateContainer>
    )
  }
}

export default CreatePost;