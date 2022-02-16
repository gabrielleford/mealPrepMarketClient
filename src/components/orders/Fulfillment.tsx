import React from "react";
import APIURL from "../helpers/environments";
import { Link, Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import FulfillmentMap from "./FulfillmentMap";
import { Center, Container, Paper, Text, Title } from "@mantine/core";

export type FulfillProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
}

export type FulfillState = {
  orders: {
    fulfillmentMethod: string,
    id: string,
    listing: {
      title: string,
      price: number,
    },
    listingId: string,
    quantity: number,
    user: {
      firstName: string,
      lastName: string,
    },
  }[],
  profileID: string,
  _isMounted: boolean,
}

class Fulfillment extends React.Component<FulfillProps, FulfillState> {
  constructor(props: FulfillProps) {
    super(props)

    this.state = {
      orders: [{
        fulfillmentMethod: '',
        id: '',
        listing: {
          title: '',
          price: 0,
        },
        listingId: '',
        quantity: 0,
        user: {
          firstName: '',
          lastName: '',
        }
      }],
      profileID: window.location.pathname.slice(13, 49),
      _isMounted: false,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  fetchOrders = async ():Promise<void> => {
    console.log(`PROFILEID: ${this.state.profileID}`);
    console.log(`USERID: ${this.props.user.userId}`)
    if (this.state.profileID === this.props.user.userId) {
      await fetch(`${APIURL}/order/fulfillment/${this.state.profileID}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.props.sessionToken}`
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          orders: [...res]
        })
      })
      .catch(error => console.log(error))
    }
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.fetchOrders();
  }

  componentDidUpdate(prevProps:Readonly<FulfillProps>, prevState:Readonly<FulfillState>) {
    if (this.props.user.userId !== prevProps.user.userId) {
      this.fetchOrders();
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
    return(
      <Container>
        {this.state.orders.length < 1 ?
          <Paper sx={{background: '#05386b', padding: '40px 50px'}} mt={90}>
            <Center>
              <Title order={1} sx={{fontWeight: '500', color: '#edf5e1'}}>You haven't placed any orders, yet!&#128577;</Title>
            </Center>
            <Center>
              <Text mt='lg' size='lg' id='noOrdersText' component={Link} to='/'>Check out what our wonderful meal preppers have to offer!</Text>
            </Center>
          </Paper> :
          <FulfillmentMap orders={this.state.orders} />
        }
        {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
      </Container>
    )
  }
}

export default Fulfillment;