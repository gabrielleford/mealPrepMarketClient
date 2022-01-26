import React, { ChangeEvent } from "react";
import { isJsxElement, readBuilderProgram } from "typescript";
import { CreateContainer, CreateForm, CreateH1, CreateInput, CreateLabel, CreatePostButton, CreateWrapper, PreviewSrc } from "./CreatePostElements";

export type CreateProps = {
  title: string,
  image: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  file: File | null,
  description: string,
  price: number,
  tags: string,
  reader: FileReader
}

class CreatePost extends React.Component<{}, CreateProps> {
  constructor(props: CreateProps) {
    super(props)

    this.state = {
      title: '',
      image: '',
      previewSrc: '',
      stringPrvwSrc: '',
      file: null,
      description: '',
      price: 0,
      tags: '',
      reader: new FileReader()
    }

    this.handleImage = this.handleImage.bind(this);
    this.previewImg = this.previewImg.bind(this);
  }

  handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      image: e.target.value
    })
    //! This returns a FileList
    console.log(e.target.files);
    if (e.target.files) {
      this.setState({
        file: e.target.files[0]
      })
      //! This is returning null even though there are files and I'm setting files[0] to file
      console.log(this.state.file);
    } else {
      this.setState({
        file: null
      })
    }
    if (this.state.file) {
      console.log('hitting this login')
      this.state.reader.readAsDataURL(this.state.file)
      this.state.reader.onload = () => {
        this.setState({
          previewSrc: this.state.reader.result
        })
        console.log(this.state.previewSrc);
      }
      this.previewImg(this.state.previewSrc)
    }
  }

  previewImg = (prvwFile: any) => {
      console.log('hitting this second piece logic')
    if (typeof prvwFile !== 'string' && prvwFile) {
      this.setState({
        stringPrvwSrc: Buffer.from(prvwFile).toString()
      })
      console.log(this.state.stringPrvwSrc)
    }
  }

  
  render(): React.ReactNode {
    return (
      <CreateContainer>
        <CreateWrapper>
          <CreateH1>Create New Post</CreateH1>
          <CreateForm>
            <CreateLabel>Image</CreateLabel>
            <CreateInput type='file' name='image' onChange={this.handleImage} value={this.state.image} />
            {this.state.stringPrvwSrc && <img src={this.state.stringPrvwSrc} alt={this.state.title} />}
            <CreateLabel>Title</CreateLabel>
            <CreateInput />
            <CreateLabel>Description</CreateLabel>
            <CreateInput />
            <CreateLabel>Price</CreateLabel>
            <CreateInput />
            <CreateLabel>Tags</CreateLabel>
            <CreateInput />
            <CreatePostButton>Create Post</CreatePostButton>
          </CreateForm>
        </CreateWrapper>
      </CreateContainer>
    )
  }
}

export default CreatePost;