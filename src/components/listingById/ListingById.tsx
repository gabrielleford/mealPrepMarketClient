import React from "react";
import APIURL from "../helpers/environments";
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
import { AppProps } from "../../App";
import { Fulfillment, FulfillmentInput, FulfillmentLabel } from "./ListingElements";
import { BsEmojiDizzy, BsEmojiFrown } from 'react-icons/bs';
import { Alert, Avatar, Badge, Button, Card, Center, Container, Grid, Group, Image, Select, Text, Title } from "@mantine/core";
import ListingEdit from "./ListingEdit";

let tagSrc:string = '';

export type ListingProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  response: AppProps['response'],
  endpointID: AppProps['endpointID'],
  setWindowPath: AppProps['setWindowPath'],
  setEndpointID: AppProps['setEndpointID'],
  setWhat: AppProps['setWhat'],
  setDlt: AppProps['setDlt'],
  clearToken: AppProps['clearToken'],
  setPrevPath: AppProps['setPrevPath'],
  setResponse: AppProps['setResponse'],
}

export type ListingState = {
  listingID: string,
  title: string,
  description: string,
  image: string,
  price: number,
  priceStr: string,
  tag: string[],
  ownerID: string,
  ownerName: string,
  quantity: string | null,
  fulfillmentMethod: string,
  responseCode: number,
  titleErr: boolean,
  descriptionErr: boolean,
  priceErr: boolean,
  _isMounted: boolean,
}

class ListingById extends React.Component<ListingProps, ListingState> {
  constructor(props: ListingProps) {
    super(props)

    this.state = {
      listingID: window.location.pathname.slice(9, 45),
      title: '',
      description: '',
      image: '',
      price: 0,
      priceStr: '',
      tag: [''],
      ownerID: '',
      ownerName: '',
      quantity: '',
      fulfillmentMethod: 'pickup',
      responseCode: 0,
      titleErr: false,
      descriptionErr: false,
      priceErr: false,
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })

    const {name, value} = e.target;
    this.checkValue(name, value);
  }

  checkValue = (name: string, value: string) => {
    switch (name) {
      case 'title': 
          value.length < 3 ? this.setState({
            titleErr: true
          }) : this.state.title.length >= 3 ? this.setState({
            titleErr: false
          }) : this.setState({
            titleErr: false
          })
        break;
      case 'description':
          value.length < 20 ? this.setState({
            descriptionErr: true
          }) : value.length > 2000 ? this.setState({
            descriptionErr: true
          }) : this.state.description.length >= 20 ? this.setState({
            descriptionErr: false
          }) : this.setState({
            descriptionErr: false
          })
        break;
      case 'price':
          +value < 1 ? this.setState({
            priceErr: true
          }) : +value > 999.99 ? this.setState({
            priceErr: true
          }) : this.state.price >= 1 ? this.setState({
            priceErr: false
          }) : this.setState({
            priceErr: false
          })
        break;
      }
    }

  handleNumber = (value: number) => {
    this.setState({
      price: value
    })
  }

  fetchListing = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/one/${this.state.listingID}`,{
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then(res => res.json())
    .then(res => {
      this.state._isMounted && this.setState({
        title: res.title,
        description: res.description,
        image: res.image,
        price: res.price,
        tag: res.tag,
        ownerID: res.userId,
        ownerName: `${res.user.firstName} ${res.user.lastName}`
      })
      this.state._isMounted && this.props.setWhat('listing');
    })
    .then(() => {
      this.setState({
        priceStr: this.state.price.toString()
      })
    })
    .catch(error => console.log(error))
  }

  handleQuantity = (value: string | null) => {
    this.setState({
      quantity: value
    })
  }

  placeOrder = async (e: React.FormEvent<HTMLButtonElement>):Promise<void> => {
    e.preventDefault();

    await fetch(`${APIURL}/order/submit/${this.state.listingID}`, {
      method: 'POST',
      body: JSON.stringify({
        order: {
          quantity: this.state.quantity,
          fulfillmentMethod: this.state.fulfillmentMethod,
          listingOwner: this.state.ownerID,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      this.state._isMounted && this.setState({
        responseCode: res.status
      })
      return res.json()
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    window.scrollTo(0, 0);
    this.fetchListing();
    this.props.setPrevPath(window.location.pathname);
    this.props.setWindowPath('listing')
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
    this.setState({
      ownerID: '',
    })
  }

  render(): React.ReactNode {
      return (
        <Container id='listingById' size={700}>
          {this.props.user.id === this.state.ownerID ?
          <ListingEdit app={{...this.props}} listingState={{...this.state}} handleChange={this.handleChange} fetchListing={this.fetchListing} handleNumber={this.handleNumber} /> :
          <Card radius='lg' padding='sm' className="listingCard">
              <Title className="listingTitle" align="center" order={1}>{this.state.title}</Title>
              <Group spacing={5} position="center">
                <Text className="listingText" size="lg">Prepared by</Text>
                <Text size="lg" sx={{color: '#379683', fontFamily: 'Open-Sans, sans-serif'}} variant="link" component={Link} to={`/profile/${this.state.ownerID}`}>{this.state.ownerName}</Text>
              </Group>
              <Center>
                <Card.Section>
                  <Image className="listingImg" radius={10} src={this.state.image} width={550} height={400} />
                </Card.Section>
              </Center>
              <Center>
              <Text mt={-7} className="description">{this.state.description}
              <br/>
                <Center>
                  <Badge mt={7} radius='lg' size="xl">${this.state.price} USD</Badge>
                </Center>
              </Text>
              </Center>
              <Group mt='md' position="center">
                {this.state.tag.map(tag => {
                  this.tagImages(tag)
                  return (
                    <Avatar key={tag} size='xl' src={tagSrc} alt={tag} />
                  )
                })}
              </Group>
              {localStorage.getItem('Authorization') ?
              <Grid>
                <Grid.Col id='select'>
                    <Select label='Quantity' style={{width: '50%', margin: '10px auto 0 auto'}} radius='md'
                    data={[
                      {value: '1', label:'1'},
                      {value: '2', label:'2'},
                      {value: '3', label:'3'},
                      {value: '4', label:'4'},
                      ]} onChange={this.handleQuantity} />
                </Grid.Col>
                <Grid.Col>
                  <Group position="center">
                    <FulfillmentLabel className='fulfillmentContainer' htmlFor="pickup" >
                      <FulfillmentInput id='pickup' name='radio' type='radio' className='fulfillmentInput' value={this.state.fulfillmentMethod} defaultChecked onChange={() => this.setState({fulfillmentMethod: 'pickup'})} />
                      <Fulfillment id='pickupBtn' className='fulfillmentSpan' onChange={() => this.setState({fulfillmentMethod: 'pickup'})}>Pickup</Fulfillment>
                    </FulfillmentLabel>
                    <FulfillmentLabel className='fulfillmentContainer' htmlFor="delivery" >
                      <FulfillmentInput id="delivery" name='radio' type='radio' className='fulfillmentInput' onChange={() => this.setState({fulfillmentMethod: 'delivery'})} />
                      <Fulfillment id='deliveryBtn' className='fulfillmentSpan' onChange={() => this.setState({fulfillmentMethod: 'delivery'})}>Delivery</Fulfillment>
                    </FulfillmentLabel>
                  </Group>
                </Grid.Col>
                <Grid.Col>
                  <Center>
                    <Button className='darkButton' radius='md' size='xl' compact onClick={this.placeOrder}>Place Order</Button>
                  </Center>
                </Grid.Col>
                <Grid.Col>
                  <Center>
                    {this.state.responseCode === 500 ?
                      <Alert icon={<BsEmojiFrown/>} title='Sorry' color='red' radius='md' withCloseButton onClose={() => this.setState({
                        responseCode: 0
                      })}>Internal Error</Alert> :
                      this.state.responseCode === 400 ?
                      <Alert icon={<BsEmojiDizzy/>} title='Oops' color='red' radius='md' withCloseButton onClose={() => this.setState({
                        responseCode: 0
                      })}>Please select quantity</Alert> : ''
                    }
                  </Center>
                </Grid.Col>
              </Grid> :
              <Group direction="column" position="center" spacing={0}>
                <Text align="center" className="listingText" mt={20} size='xl'>Interested in ordering?</Text>
                <Text size='xl' sx={{color: '#379683', fontFamily: 'Open-Sans, sans-serif'}} variant='link' component={Link} to='/login'>Get started!</Text>
              </Group>
              }
          </Card>
          }
          {
            this.state.responseCode === 201 && this.state._isMounted ?
            <Navigate to={`/orders/${this.props.user.id}`} replace={true} /> : ''
          }
        </Container>
      )
  }
}

export default ListingById;