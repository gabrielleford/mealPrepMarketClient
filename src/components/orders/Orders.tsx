import { Container, Grid } from "@mantine/core";
import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import OrdersMap from "./OrdersMap";

export type OrderProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
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
    if (this.state.profileID === this.props.user.userId) {
      await fetch(`${APIURL}/order/myOrders`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.props.sessionToken}`
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.state._isMounted && this.setState({
          orders: [...res],
          ordersFetched: true,
        });
        console.log(res);
      })
    }
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
    this.fetchOrders();
  }

  componentDidUpdate(prevProps:Readonly<OrderProps>, prevState:Readonly<OrderState>) {
    if (this.props.user.userId !== prevProps.user.userId) {
      this.fetchOrders();
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
          {this.state.orders[0].id !== '' && <OrdersMap orders={this.state.orders} sessionToken={this.props.sessionToken} fetchOrders={this.fetchOrders} />}
          {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
      </Container>
    )
  }
}

export default Orders;