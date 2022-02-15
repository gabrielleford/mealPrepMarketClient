import React, { ChangeEvent } from "react";
import APIURL from "../helpers/environments";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import Keto from '../../assets/mealPrepMarketLightIconK.png';
import LowCarb from '../../assets/mealPrepMarketLightIconLC.png';
import Mediterranean from '../../assets/mealPrepMarketLightIconM.png';
import Paleo from '../../assets/mealPrepMarketLightIconP.png';
import Vegan from '../../assets/mealPrepMarketLightIconV.png';
import Vegetarian from '../../assets/mealPrepMarketLightIconVeg.png';
import DairyFree from '../../assets/mealPrepMarketLightIconDF.png';
import EggFree from '../../assets/mealPrepMarketLightIconEF.png';
import GlutenFree from '../../assets/mealPrepMarketLightIconGF.png';
import NutFree from '../../assets/mealPrepMarketLightIconNF.png';
import SoyFree from '../../assets/mealPrepMarketLightIconSoyF.png';
import SugarFree from '../../assets/mealPrepMarketLightIconSF.png';
import { BsCheck2, BsEmojiFrown} from 'react-icons/bs';
import { ImageInput, ImageUpload, ImageUploadDiv } from "../ReusableElements";
import { CreateInput, TagLabel } from "./CreateListingElements";
import { Alert, Button, Center, Container, Grid, Group, Image, Input, NumberInput, Paper, Text, Textarea, Title } from '@mantine/core';

const lineBreakRegex: RegExp = /\n/g;

export type CreateState = {
  title: string,
  image: string,
  description: string,
  price: number | undefined,
  tags: string[],
  listingID: string,
  previewSrc: string | ArrayBuffer | null,
  stringPrvwSrc: string,
  titleErr: boolean,
  descriptionErr: boolean,
  priceErr: boolean,
  imageErr: boolean,
  responseCode: number,
  submitted: boolean,
  errorMessage: string,
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
      price: undefined,
      tags: [],
      listingID: '',
      previewSrc: '',
      stringPrvwSrc: '',
      titleErr: false,
      descriptionErr: false,
      priceErr: false,
      imageErr: false,
      responseCode: 0,
      submitted: false,
      errorMessage: '',
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleTag = this.handleTag.bind(this);
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

    const {name, value} = e.target;
    this.checkValue(name, value);
  }

  handleNumber = (value: number | undefined) => {
    this.setState({
      price: value
    })
  }

  checkValue = (name: string, value: string) => {
    switch (name) {
      case 'title': 
          value.length < 3 ? this.setState({
            titleErr: true
          }) : this.setState({
            titleErr: false
          })
        break;
      case 'description':
          value.length < 20 ? this.setState({
            descriptionErr: true
          }) : value.length > 2000 ? this.setState({
            descriptionErr: true
          }) : this.setState({
            descriptionErr: false
          })
        break;
      case 'price':
          +value < 1 ? this.setState({
            priceErr: true
          }) : +value > 999.99 ? this.setState({
            priceErr: true
          }) : this.setState({
            priceErr: false
          })
        break;
      }
    }

  handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checkedTags:string[] = [...this.state.tags, e.target.id];
    if (this.state.tags.includes(e.target.id)) {
      checkedTags = checkedTags.filter(tag => tag !== e.target.id)
    }
    this.setState({
      tags: checkedTags
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

  handlePost = () => {
    this.setState({
      submitted: true,
    })
    this.postListing(this.state.stringPrvwSrc);
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
          description: this.state.description.replaceAll(lineBreakRegex, '\n'),
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
      console.log(res);
      this.state._isMounted && this.setState({
        submitted: false,
        responseCode: res.status
      })
      return res.json();
    })
    .then(res => {
      console.log(res);
      if (this.state.responseCode === 400) {
        this.state._isMounted && this.setState({
          errorMessage: res.message
        })
      }
      if (this.state.responseCode === 201) {
        this.state._isMounted && this.setState({
          listingID: res.listing.id
        })
      }
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
      <Container className='formContainer' mt={150} size={600} padding='lg'>
        <Paper className='form' sx={{paddingTop: 40, paddingBottom: 40, paddingLeft: 75, paddingRight: 75}} mt='xl' shadow='xl' radius='md'>
          <Title align='center' className='formTitle' order={1}>Create New Listing</Title>
          <Grid gutter='lg'>
            <Grid.Col>
              <ImageUploadDiv>
                <ImageUpload htmlFor='image'>Choose Image</ImageUpload>
                <ImageInput type='file' id='image' onChange={this.handleImage} value={this.state.image} />
              </ImageUploadDiv>
              <Center>
                <Text size='xs' sx={{color: '#edf5e1'}}>{this.state.image.replace('C:\\fakepath\\', '')}</Text>
              </Center>
              {this.state.stringPrvwSrc && <Image width={400} height={250} src={this.state.stringPrvwSrc} />}
            </Grid.Col>
            <Grid.Col>
                <Input name='title' placeholder='Title' radius='md' invalid={this.state.titleErr ? true : false} required value={this.state.title} onChange={this.handleChange} />
            </Grid.Col>
            <Grid.Col>
              <Textarea name='description' placeholder="Description" radius='md' invalid={this.state.descriptionErr ? true : false} required value={this.state.description} onChange={this.handleChange} />
            </Grid.Col>
            <Grid.Col>
              <NumberInput name='price' placeholder="Price" radius='md' invalid={this.state.priceErr ? true : false} required hideControls value={this.state.price} onChange={this.handleNumber} />
            </Grid.Col>
            <Grid.Col>
              <Group position="center">
                <TagRender handleTag={this.handleTag} />
              </Group>
            </Grid.Col>
            <Grid.Col>
                <Center>
                  <Button className='formButton' radius='md' size='lg' compact loading={this.state.responseCode !== 201 && this.state.submitted ? true : false} onClick={this.handlePost}>Create Listing</Button>
                </Center>
              </Grid.Col>
              <Grid.Col>
                <Center>
                  {this.state.responseCode === 500 ?
                    <Alert icon={<BsEmojiFrown/>} title='Sorry' color='red' radius='md' withCloseButton onClose={() => this.setState({
                      responseCode: 0
                    })}>Internal Error</Alert> : 
                    this.state.responseCode === 400 ?
                    <Alert icon={<BsCheck2/>} title='Oops!' color='red' radius='md' withCloseButton onClose={() => this.setState({
                      responseCode: 0
                    })}>{this.state.errorMessage}</Alert> : ''
                  }
                </Center>
              </Grid.Col>
          </Grid>
        </Paper>
        {this.state.listingID ? 
        <Navigate to={`/listing/${this.state.listingID}`} replace={true} /> : 
        !localStorage.getItem('Authorization') ? 
        <Navigate to='/' replace={true} /> : ''
        }
      </Container>
    )
  }
}

export default CreateListing;

type TagProps = {
  handleTag: CreateListing['handleTag']
}

class TagRender extends React.Component<TagProps> {
  render(): React.ReactNode {
    return (
      <>
      <CreateInput id='Keto' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Keto">
        <Image className="tagImg" width={80} height={80} src={Keto} />
      </TagLabel>
      <CreateInput id='Low Carb' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Low Carb">
        <Image className="tagImg" width={80} height={80} src={LowCarb} />
      </TagLabel>
      <CreateInput id='Mediterranean' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Mediterranean">
        <Image className="tagImg" width={80} height={80} src={Mediterranean} />
      </TagLabel>
      <CreateInput id='Paleo' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Paleo">
        <Image className="tagImg" width={80} height={80} src={Paleo} />
      </TagLabel>
      <CreateInput id='Vegan' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Vegan">
        <Image className="tagImg" width={80} height={80} src={Vegan} />
      </TagLabel>
      <CreateInput id='Vegetarian' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Vegetarian">
        <Image className="tagImg" width={80} height={80} src={Vegetarian} />
      </TagLabel>
      <CreateInput id='Dairy Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Dairy Free">
        <Image className="tagImg" width={80} height={80} src={DairyFree} />
      </TagLabel>
      <CreateInput id='Egg Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Egg Free">
        <Image className="tagImg" width={80} height={80} src={EggFree} />
      </TagLabel>
      <CreateInput id='Gluten Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Gluten Free">
        <Image className="tagImg" width={80} height={80} src={GlutenFree} />
      </TagLabel>
      <CreateInput id='Nut Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Nut Free">
        <Image className="tagImg" width={80} height={80} src={NutFree} />
      </TagLabel>
      <CreateInput id='Soy Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Soy Free">
        <Image className="tagImg" width={80} height={80} src={SoyFree} />
      </TagLabel>
      <CreateInput id='Sugar Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Sugar Free">
        <Image className="tagImg" width={80} height={80} src={SugarFree} />
      </TagLabel>
      </>
    )
  }
}