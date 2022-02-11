import React from "react";
import APIURL from "../helpers/environments";
import { Link, Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { Fulfillment, FulfillmentInput, FulfillmentLabel } from "./ListingElements";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { BsEmojiDizzy, BsEmojiFrown } from 'react-icons/bs';
import { Alert, Badge, Button, Card, Center, Container, Grid, Group, Image, Select, Text, Title } from "@mantine/core";

type ListingProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  what: AppProps['what'],
  listingEdit: AppProps['listingEdit'],
  dlt: AppProps['dlt'],
  response: AppProps['response'],
  fetchData: AppProps['fetchData'],
  setWhat: AppProps['setWhat'],
  setListingEdit: AppProps['setListingEdit'],
  setDelete: AppProps['setDelete'],
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
  tag: string,
  ownerID: string,
  ownerName: string,
  quantity: string | null,
  fulfillmentMethod: string,
  responseCode: number,
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
      tag: '',
      ownerID: '',
      ownerName: '',
      quantity: '',
      fulfillmentMethod: 'pickup',
      responseCode: 0,
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  fetchListing = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/${this.state.listingID}`,{
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
    .catch(error => console.log(error))
  }

  handleChange = (value: string | null) => {
    this.setState({
      quantity: value
    })
  }

  placeOrder = async (e: React.FormEvent<HTMLButtonElement>):Promise<void> => {
    e.preventDefault();

    await fetch(`${APIURL}/order/${this.state.listingID}`, {
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

  editListing = () => {
    this.props.setListingEdit(!this.props.listingEdit);
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.props.fetchData();
    this.fetchListing();
    this.props.setPrevPath(window.location.pathname);
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
    this.props.setDelete(false);
    this.setState({
      ownerID: '',
    })
  }

  render(): React.ReactNode {
      return (
        <Container id='listingById' size={700}>
          {this.props.dlt && 
            <ConfirmDelete what={this.props.what} dlt={this.props.dlt} listingID={this.state.listingID} sessionToken={this.props.sessionToken} user={this.props.user} setDelete={this.props.setDelete} clearToken={this.props.clearToken} response={this.props.response} setResponse={this.props.setResponse} />
          }
          <Card radius='lg' padding='sm' className="listingCard">
              <Title className="listingTitle" align="center" order={1}>{this.state.title}</Title>
              <Group spacing={5} position="center">
                {this.state.ownerID === this.props.user.userId ? 
                <Text size="lg" sx={{color: '#379683', fontFamily: 'Open-Sans, sans-serif'}} align="center" variant="link" component={Link} to={`/profile/${this.state.ownerID}`}>{this.state.ownerName}</Text> :
                <>
                <Text className="listingText" size="lg">Prepared by</Text>
                <Text size="lg" sx={{color: '#379683', fontFamily: 'Open-Sans, sans-serif'}} variant="link" component={Link} to={`/profile/${this.state.ownerID}`}>{this.state.ownerName}</Text>
                </>}
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
              {this.props.user.userId === this.state.ownerID ?
              <Group mt='md' position="center" spacing='xl'>
                <Button className="darkButton" radius='md' size='xl' compact onClick={this.editListing}>Edit</Button>
                <Button className="darkButton" radius='md' size='xl' compact onClick={() => this.props.setDelete(true)}>Delete</Button>
              </Group> :
              localStorage.getItem('Authorization') ?
              <Grid>
                <Grid.Col id='select'>
                    <Select label='Quantity' style={{width: '50%', margin: '10px auto 0 auto'}} radius='md'
                    data={[
                      {value: '1', label:'1'},
                      {value: '2', label:'2'},
                      {value: '3', label:'3'},
                      {value: '4', label:'4'},
                      ]} onChange={this.handleChange} />
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
          {this.props.response === 200 && this.state._isMounted ?
            <Navigate to='/' replace={true} /> :
            this.props.listingEdit ?
            <Navigate to={`/listing/edit/${this.state.listingID}`} replace={true} /> :
            this.state.responseCode === 201 ?
            <Navigate to={`/orders/${this.props.user.userId}`} replace={true} /> : ''
          }
        </Container>
      )
  }
}

export default ListingById;