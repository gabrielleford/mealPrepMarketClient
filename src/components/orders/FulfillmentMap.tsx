import React from "react";
import { ListingCard, ListingH1 } from "../ReusableElements";
import { FulfillState } from "./Fulfillment";
import { OrderInfo, OrderP } from "./OrdersElements";

type FulfillMapProps = {
  orders: FulfillState['orders'],
}

type FulfillMapState = {
  _isMounted: boolean,
}

class FulfillmentMap extends React.Component<FulfillMapProps, FulfillMapState> {
  constructor(props:FulfillMapProps) {
    super(props)

    this.state = {
      _isMounted: false,
    }
  }

  mapOrders = () => {
    return (
      this.state._isMounted && this.props.orders.map((order):JSX.Element => {
        return (
          <ListingCard key={order.id}>
            <ListingH1>{order.listing.title}</ListingH1>
            <OrderP>Customer: {order.user.firstName} {order.user.lastName}</OrderP>
            <OrderP>Quantity: {order.quantity}</OrderP>
            <OrderP>Pickup or Delivery: {order.fulfillmentMethod}</OrderP>
            <OrderP>Total: {order.quantity * order.listing.price}</OrderP>
          </ListingCard>
        )
      })
    )
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    })
    console.log(this.props.orders)
  }

  componentDidUpdate(prevProps:Readonly<FulfillMapProps>) {
    if (this.props.orders !== prevProps.orders) {
      console.log(this.props.orders);
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    })
  }

  render(): React.ReactNode {
    return (
      <>
      {this.mapOrders()}
      </>
    )
  }
}

export default FulfillmentMap;