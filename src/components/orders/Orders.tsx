import { Center, Container, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import OrdersMap from "./OrdersMap";

export type OrderProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  what: AppProps['what'],
  response: AppProps['response'],
  dlt: AppProps['dlt'],
  endpointID: AppProps['endpointID'],
  mapInfo: AppProps['mapInfo'],
  setMapInfo: AppProps['setMapInfo'],
  setWindowPath: AppProps['setWindowPath'],
  setDlt: AppProps['setDlt'],
  setWhat: AppProps['setWhat'],
  clearToken: AppProps['clearToken'],
  setResponse: AppProps['setResponse'],
  setEndpointID: AppProps['setEndpointID'],
}

export type OrderState = {
  orders: {
    id: string,
    image: string,
    quantity: number,
    fulfillmentMethod: string,
    listing: {id: string, title: string, image: string, price: number}
  }[]
  profileID: string,
  ordersFetched: boolean,
  _isMounted: boolean,
}

class Orders extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
    super(props)

    this.state = {
      orders: [{id: '', image: '', quantity: 0, fulfillmentMethod: '', listing: {id: '',title: '', image: '', price: 0}}],
      profileID: window.location.pathname.slice(8, 44),
      ordersFetched: false,
      _isMounted: false,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  fetchOrders = async ():Promise<void> => {
    if (this.state.profileID === this.props.user.id) {
      await fetch(`${APIURL}/order/myOrders`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.props.sessionToken}`
        })
      })
      .then(res => res.json())
      .then(res => {
        this.state._isMounted && this.setState({
          orders: [...res],
          ordersFetched: true,
        });
      })
    }
  }

  fetchMapInfo = async ():Promise<void> => {
    await fetch(`${APIURL}/user/checkOrders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.sessionToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.props.setMapInfo(res);
    })
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
    window.scrollTo(0, 0);
    this.fetchMapInfo();
    if (this.props.mapInfo.orders.length > 0) {
      this.fetchOrders();
    }
    this.props.setWhat('order');
    this.props.setWindowPath('order')
  }

  componentDidUpdate(prevProps:Readonly<OrderProps>, prevState:Readonly<OrderState>) {
    if (this.props.user.id !== prevProps.user.id && this.props.mapInfo.orders.length > 0) {
      this.fetchMapInfo();
      this.fetchOrders();
    }
    if (this.props.mapInfo.orders.length !== prevProps.mapInfo.orders.length) {
      this.fetchMapInfo();
      this.fetchOrders();
    }
    if (this.props.response !== prevProps.response && this.props.response === 200) {
      this.fetchMapInfo();
      this.fetchOrders();
      this.props.setResponse(0);
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render(): React.ReactNode {
    return (
      <Container>
          {this.props.mapInfo.orders.length === 0 ?
            <Paper sx={{background: '#05386b', padding: '40px 50px'}} radius='lg' mt={200}>
              <Center>
                <Title order={1} sx={{fontWeight: '500', color: '#edf5e1'}}>You haven't placed any orders, yet!&#128577;</Title>
              </Center>
              <Center>
                <Text mt='lg' size='lg' id='noOrdersText' component={Link} to='/'>Check out what our wonderful meal preppers have to offer!</Text>
              </Center>
            </Paper> :
            <OrdersMap orders={this.state.orders} app={{...this.props}} fetchOrders={this.fetchOrders} />
          }
          {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
      </Container>
    )
  }
}

export default Orders;