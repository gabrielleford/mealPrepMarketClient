import React, { ChangeEvent } from "react";
import APIURL from "../helpers/environments";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { FileName, ImageInput, ImageUpload, ImageUploadDiv } from "../ReusableElements";
import { CreateContainer, CreateForm, CreateH1, CreateInput, CreateLabel, CreateListingButton, CreateTextarea, CreateWrapper, PreviewSrc } from "./CreateListingElements";

//TODO: Form validation

export type CreateState = {
  title: string,
  image: string,
  description: string,
  price: number,
  tags: string[],
  listingID: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  _isMounted: boolean,
}

type CreateProps = {
  sessionToken: AppProps['sessionToken'],
}

class CreateListing extends React.Component<CreateProps, CreateState> {
  constructor(props: CreateProps) {
    super(props)

    this.state = {
      title: '',
      image: '',
      description: '',
      price: 0,
      tags: ['vegan', 'vegetarian', 'raw'],
      listingID: '',
      previewSrc: '',
      stringPrvwSrc: '',
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.previewImgSrc = this.previewImgSrc.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.postListing = this.postListing.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      image: e.target.value
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
      stringPrvwSrc: Buffer.from(prvwFile).toString()
    })
  }
}

  handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.postListing(this.state.stringPrvwSrc)
  }

  postListing = async (encodedImg: string):Promise<void> => {
    var formData = new FormData();
    formData.append('file', encodedImg);
    formData.append('upload_preset', 'MealPrepMarket');

    var res = await fetch(`https://api.cloudinary.com/v1_1/gabrielleford/image/upload`, {
      method: 'POST',
      body: formData,
    })
    var cloudinary = await res.json();

    await fetch(`${APIURL}/listing/create`, {
      method: "POST",
      body: JSON.stringify({
        listing: {
          title: this.state.title,
          description: this.state.description,
          image: cloudinary.url,
          price: this.state.price,
          tag: this.state.tags,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
      this.state._isMounted && this.setState({
        listingID: res.listing.id
      })
    })
    .catch((error) => console.log(error))
  }

  componentDidMount(){
    this.setState({
      _isMounted: true,
    })
  }

  componentDidUpdate(prevProps:Readonly<CreateProps>, prevState:Readonly<CreateState>){
    if(this.state.previewSrc !== prevState.previewSrc ) {
      this.previewImgSrc(this.state.previewSrc);
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }
  
  render(): React.ReactNode {
    return (
      <CreateContainer>
        <CreateWrapper>
          <CreateH1>Create New Listing</CreateH1>
          <CreateForm onSubmit={this.handlePost}>
            <ImageUploadDiv>
              <ImageUpload htmlFor='image'>Choose Image</ImageUpload>
              <ImageInput type='file' id='image' onChange={this.handleImage} value={this.state.image} />
            </ImageUploadDiv>
            <FileName>{this.state.image}</FileName>
            {this.state.stringPrvwSrc && <PreviewSrc src={this.state.stringPrvwSrc}/>}
            <CreateLabel>Title</CreateLabel>
            <CreateInput type='text' name="title" onChange={this.handleChange} />
            <CreateLabel>Description</CreateLabel>
            <CreateTextarea name="description" onChange={this.handleChange} />
            <CreateLabel>Price</CreateLabel>
            <CreateInput type='text' name="price" onChange={this.handleChange} />
            <CreateLabel>Tags</CreateLabel>
            <CreateInput type='text' name="tags" onChange={this.handleChange} />
            <CreateListingButton>Create Listing</CreateListingButton>
          </CreateForm>
        </CreateWrapper>
        {this.state.listingID ? 
        <Navigate to={`/listing/${this.state.listingID}`} replace={true} /> : 
        !localStorage.getItem('Authorization') ? 
        <Navigate to='/' replace={true} /> : ''
        }
      </CreateContainer>
    )
  }
}

export default CreateListing;