import React from "react";
import APIURL from '../helpers/environments'
import Keto from '../../assets/mealPrepMarketIconKeto.png';
import LowCarb from '../../assets/mealPrepMarketIconLowCarb.png';
import Mediterranean from '../../assets/mealPrepMarketIconMediterranean.png';
import Paleo from '../../assets/mealPrepMarketIconPaleo.png';
import Vegan from '../../assets/mealPrepMarketIconVegan.png';
import Vegetarian from '../../assets/mealPrepMarketIconVegetarian.png';
import DairyFree from '../../assets/mealPrepMarketIconDairyFree.png';
import EggFree from '../../assets/mealPrepMarketIconEggFree.png';
import GlutenFree from '../../assets/mealPrepMarketIconGlutenFree.png';
import NutFree from '../../assets/mealPrepMarketIconNutFree.png';
import SoyFree from '../../assets/mealPrepMarketIconSoyFree.png';
import SugarFree from '../../assets/mealPrepMarketIconSugarFree.png';
import { Link, Navigate } from "react-router-dom";
import { BsEmojiDizzy, BsEmojiFrown } from 'react-icons/bs';
import ListingById, { ListingProps, ListingState } from "./ListingById";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { Avatar, Badge, Button, Card, Center, Group, Image, Input, NumberInput, Spoiler, Text, Title, Textarea, Alert } from "@mantine/core";

let tagSrc:string = '';

export type EditState = {
  listingID: string,
  errorMessage: string,
  inputVisible: boolean,
  editDescription: boolean,
  editTitle: boolean,
  editPrice: boolean,
  responseCode: number,
  submitted: boolean,
  _isMounted: boolean,
}

export type EditProps = {
  app: ListingProps,
  listingState: ListingState,
  handleChange: ListingById['handleChange'],
  handleNumber: ListingById['handleNumber'],
  fetchListing: ListingById['fetchListing'],
}

class ListingEdit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props)

    this.state = {
      listingID: window.location.pathname.slice(9, 45),
      responseCode: 0,
      errorMessage: '',
      inputVisible: false,
      editDescription: false,
      editTitle: false,
      editPrice: false,
      submitted: false,
      _isMounted: false,
      }

      this.setEdit = this.setEdit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
  }

  // ** Render listing info & switch to input on click ** //
  renderTitle = () => {
    if (!this.state.editTitle) {
      return (
        <>
          <Title sx={{cursor: 'pointer'}} className="listingTitle" align="center" order={1} onClick={() => this.setEdit('title')}>{this.props.listingState.title}</Title>
        </>
      )
    } else {
      return (
          <Group position="center">
            <Input name="title" radius='md' size='lg' value={this.props.listingState.title} invalid={this.props.listingState.titleErr ? true : false} onChange={this.props.handleChange}/>
          </Group>
      )
    }
  }

  renderDescription = () => {
    if (!this.state.editDescription) {
      return (
        <>
          {this.props.listingState.description.length > 255 ?
            <Spoiler mt={-30} sx={{color: '#05386b'}} maxHeight={120} showLabel='View more' hideLabel='View less'>
              <Text mt={-40} style={{paddingTop: '55px', cursor: 'pointer'}} className="description" onClick={() => this.setEdit('description')}>{this.props.listingState.description}
              </Text>
            </Spoiler> :
            <Text mt={-40} style={{paddingTop: '55px', cursor: 'pointer'}} className="description" onClick={() => this.setEdit('description')}>{this.props.listingState.description}
            <br/>
            {this.renderPrice()}
            </Text>
          }
        </>
      )
      
    } else {
      return(
        <Group mt='xl' direction="column" position="center">
          <Textarea sx={{cursor: 'pointer', width:'400px'}} name='description' placeholder={`$${this.props.listingState.description} USD`} radius='md' invalid={this.props.listingState.descriptionErr ? true : false} required value={this.props.listingState.description} onChange={this.props.handleChange} />
          <NumberInput name='price' placeholder={this.props.listingState.priceStr} radius='md' invalid={this.props.listingState.priceErr ? true : false} required hideControls value={this.props.listingState.price} onChange={this.props.handleNumber} />
        </Group>
      )
    }
  }

  renderPrice = () => {
    if (!this.state.editPrice) {
      return (
        <>
        {this.props.listingState.description.length > 255 ?
          <Badge sx={{cursor: 'pointer'}} color='secondary' mt={5} mb={5} radius='lg' size="xl" onClick={() => this.setEdit('price')}>${this.props.listingState.price} USD</Badge> :
          <Center>
            <Badge sx={{cursor: 'pointer'}} mt={20} radius='lg' size="xl" onClick={() => this.setEdit('price')}>${this.props.listingState.price} USD</Badge>
          </Center>
        }
        </>
      )
    }
  }

  setEdit = (name: string) => {
    switch(name) {
      case 'title':
        this.setState({
          editTitle: !this.state.editTitle,
          inputVisible: true,
        })
        break;
      case 'description':
        this.setState({
          editDescription: !this.state.editDescription,
          inputVisible: true,
        })
        break;
      case 'price':
        this.setState({
          editPrice: !this.state.editPrice,
          inputVisible: true
        });
        break;
      default:
        this.setState({
          editDescription: false,
          editPrice: false,
  
          editTitle: false,
          inputVisible: false,
        })
    }
  }

  cancelEdit = () => {
    this.setState({
      editDescription: false,
      editPrice: false,
      editTitle: false,
      inputVisible: false,
    })
  }

  tagImages = (tag: string) => {
    switch(tag) {
      case 'Keto':
        tagSrc = Keto
        break;
      case 'Low Carb':
        tagSrc = LowCarb
        break;
      case 'Mediterranean':
        tagSrc = Mediterranean
        break;
      case 'Paleo':
        tagSrc = Paleo
        break;
      case 'Vegan':
        tagSrc = Vegan
        break;
      case 'Vegetarian':
        tagSrc = Vegetarian
        break;
      case 'Dairy Free':
        tagSrc = DairyFree
        break;
      case 'Egg Free':
        tagSrc = EggFree
        break;
      case 'Gluten Free':
        tagSrc = GlutenFree
        break;
      case 'Nut Free':
        tagSrc = NutFree
        break;
      case 'Soy Free':
        tagSrc = SoyFree
        break;
      case 'Sugar Free':
        tagSrc = SugarFree
        break;
      default:
        tagSrc= ''
    }
    return (
      tagSrc
    )
  }

  updateListing = async ():Promise<void> => {
    this.setState({
      submitted: true
    })
    await fetch(`${APIURL}/listing/edit/${this.state.listingID}`, {
      method: 'PUT',
      body: JSON.stringify({
        listing: {
          title: this.props.listingState.title,
          description: this.props.listingState.description,
          image: this.props.listingState.image,
          price: this.props.listingState.price,
          tag: this.props.listingState.tag,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.app.sessionToken}`
      })
    })
    .then(res => {
      this.state._isMounted && this.setState({
        responseCode: res.status
      })
      console.log(res)
      return res.json()
    })
    .then(res => {
      if (this.state.responseCode === 400) {
        this.state._isMounted && this.setState({
          errorMessage: res.message
        })
      }
      console.log(res)
      this.state._isMounted &&  this.setState({
        editDescription: false,
        editPrice: false,
        editTitle: false,
        inputVisible: false,
        submitted: false,
      })
      this.props.fetchListing()
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.props.app.setWhat('listing');
    this.props.app.setEndpointID(this.props.listingState.listingID);
  }

  componentDidUpdate(prevProps:Readonly<EditProps>, prevState:Readonly<EditState>) {
    if (this.state.inputVisible !== prevState.inputVisible) {
      this.props.fetchListing();
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
    return (
      <Card radius='lg' padding='sm' className="listingCard">
        {this.renderTitle()}
        <Center>
          <Text size="lg" sx={{color: '#379683', fontFamily: 'Open-Sans, sans-serif'}} align="center" variant="link" component={Link} to={`/profile/${this.props.listingState.ownerID}`}>{this.props.listingState.ownerName}</Text> 
        </Center>
        <Center>
          <Card.Section>
            <Image className="listingImg" radius={10} src={this.props.listingState.image} width={550} height={400} />
          </Card.Section>
        </Center>
        <Center>
          {this.renderDescription()}
        </Center>
        {this.props.listingState.description.length > 255 && 
        <Center>
          {this.renderPrice()}
        </Center>
        }
        <Group mt='md' position="center">
          {this.props.listingState.tag.map(tag => {
            this.tagImages(tag)
            return (
              <Avatar key={tag} size='xl' src={tagSrc} alt={tag} />
            )
          })}
        </Group>
        {this.state.inputVisible &&
          <Group mt='sm' position="center" spacing='lg'>
            <Button onClick={this.updateListing} className="formButton" size="sm" radius='md' compact loading={this.state.submitted && this.state.responseCode !== 201 ? true : false} >Save</Button>
            <Button onClick={this.cancelEdit} className='formButton' size="sm" radius='md' compact>Cancel</Button>
          </Group>
        }
        <Group mt='lg' mb='lg' position="center">
          <Button className="formButton" size="lg" radius='md' compact onClick={() => this.props.app.setDlt(true)}>Delete</Button>
        </Group>
        {this.state.responseCode === 500 ?
          <Alert icon={<BsEmojiFrown/>} title='Sorry' color='red' radius='md' withCloseButton onClose={() => this.setState({responseCode: 0})}>Internal Error</Alert> :
        this.state.responseCode === 400 ?
          <Alert icon={<BsEmojiDizzy/>} title='Oops!' color='red' radius='md' withCloseButton onClose={() => this.setState({responseCode: 0})}>{this.state.errorMessage}</Alert> : ''
        }
        {this.props.app.dlt && <ConfirmDelete sessionToken={this.props.app.sessionToken} what={this.props.app.what} dlt={this.props.app.dlt} setDlt={this.props.app.setDlt} endpointID={this.props.app.endpointID} setEndpointID={this.props.app.setEndpointID} response={this.props.app.response} setResponse={this.props.app.setResponse} clearToken={this.props.app.clearToken}/>}
        {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
        {this.props.app.response === 200 && <Navigate to={`/profile/${this.props.listingState.ownerID}`} replace={true} />}
      </Card>
    )
  }
}

export default ListingEdit;