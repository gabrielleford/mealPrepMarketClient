import React from "react";
import { ListingCard, ListingH1 } from "../ReusableElements";
import { FulfillProps, FulfillState } from "./Fulfillment";
import { OrderInfo, OrderP } from "./OrdersElements";

type FulfillMapProps = {
  orderedListing: FulfillState['orderedListing'],
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

  // mapOrders = () => {
  //   return(
  //     this.state._isMounted && this.props.listings.map((listing) => {
  //       if (listing.orders) {
  //         this.setState({
  //           orderedListing: [...listing.orders]
  //         })
  //       }
  //     })
  //   )
  // }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    })
    console.log(this.props.orderedListing)
  }

  componentDidUpdate(prevProps:Readonly<FulfillMapProps>) {
    if (this.props.orderedListing !== prevProps.orderedListing) {
      console.log(this.props.orderedListing);
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
      {/* {this.mapOrders()} */}
      </>
    )
  }
}

export default FulfillmentMap;

// return(
//   <ListingCard key={orderedListing.id}>
//   <ListingH1>{orderedListing.title}</ListingH1>
//   {orderedListing.orders.map((order):JSX.Element => {
//     return (
//       <OrderInfo key={order.id}>
//         <OrderP>Name: {order.user.firstName} {order.user.lastName}</OrderP>
//         <OrderP>Quantity: {order.quantity}</OrderP>
//         <OrderP>Total: {order.quantity * listing.price}</OrderP>
//       </OrderInfo>
//     )
//   })}
// </ListingCard>
// )