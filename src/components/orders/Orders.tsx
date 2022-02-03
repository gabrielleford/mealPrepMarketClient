import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { ListingCards } from "../ReusableElements";
import { OrdersContainer, OrdersWrapper } from "./OrdersElements";
import OrdersMap from "./OrdersMap";

export type OrderProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
}

export type OrderState = {
  orders: {
    id: string,
    image: string,
    quantity: number,
    listing: {title: string, price: number}
  }[]
  profileID: string,
  _isMounted: boolean,
}

class Orders extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
    super(props)

    this.state = {
      orders: [{id: '', image: '', quantity: 0, listing: {title: '', price: 0}}],
      profileID: window.location.pathname.slice(8, 44),
      _isMounted: false,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  fetchOrders = async ():Promise<void> => {
    if (this.state.profileID === this.props.userID) {
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
        });
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
    if (this.props.userID !== prevProps.userID) {
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
      <>
      <OrdersContainer>
        <OrdersWrapper>
          <ListingCards>
            {this.state.orders !== [{id: '', image: '', quantity: 0, listing: {title: '', price: 0}}] && <OrdersMap orders={this.state.orders} sessionToken={this.props.sessionToken} fetchOrders={this.fetchOrders} />}
          </ListingCards>
        </OrdersWrapper>
        {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
      </OrdersContainer>
      </>
    )
  }
}

export default Orders;