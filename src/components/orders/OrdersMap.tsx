import React from "react";
import APIURL from "../helpers/environments";
import { ListingCard, ListingH1, ListingImg } from "../ReusableElements";
import { OrderProps, OrderState } from "./Orders";
import { CancelOrder, OrderP } from "./OrdersElements";

type OrderMapState = {
  orderID: string,
  deleted: boolean,
  _isMounted: boolean,
}

type OrderMapProps = {
  orders: OrderState['orders'],
  sessionToken: OrderProps['sessionToken'],
  fetchOrders: () => Promise<void>,
}

class OrdersMap extends React.Component<OrderMapProps, OrderMapState> {
  constructor(props: OrderMapProps) {
    super(props)

    this.state = {
      orderID: '',
      deleted: false,
      _isMounted: false,
    }
  }

  cancelOrder = async (id: string):Promise<void> => {
    await fetch(`${APIURL}/order/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      console.log(res)
      this.setState({
        deleted: !this.state.deleted
      })
    })
    .catch(error => console.log(error))
  }

  orderMap = () => {
    return (
      this.state._isMounted && this.props.orders.map((order):JSX.Element => {
        console.log(order.id);
        return(
          <ListingCard key={order.id}>
            <ListingH1>{order.listing.title}</ListingH1>
            <ListingImg src="https://via.placeholder.com/200x150" />
            <OrderP>{order.quantity}</OrderP>
            <OrderP>${order.quantity * order.listing.price} USD</OrderP>
            <CancelOrder onClick={() => this.cancelOrder(order.id)}>Cancel Order</CancelOrder>
          </ListingCard>
        )
      })
    )
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
  }

  componentDidUpdate(prevProps:Readonly<OrderMapProps>, prevState:Readonly<OrderMapState>) {
    if (this.state.deleted !== prevState.deleted){
      this.props.fetchOrders();
      this.orderMap();
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  render(): React.ReactNode {
    return (
      <>
      {this.orderMap()}
      </>
    )
  }
}

export default OrdersMap;