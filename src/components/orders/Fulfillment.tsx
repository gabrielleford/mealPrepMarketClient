import React from "react";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { ListingCards } from "../ReusableElements";
import FulfillmentMap from "./FulfillmentMap";
import { OrdersContainer, OrdersWrapper } from "./OrdersElements";

export type FulfillProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  fetchData: AppProps['fetchData'],
}

export type FulfillState = {
  listings: {
    id: string,
    title: string,
    price: number,
    orders: {
      id: string,
      fulfillmentMethod: string,
      quantity: number,
      user: {
        firstName: string,
        lastName: string,
      },
    }[],
  }[],
  profileID: string,
  orderedListing: {listings: {}}[],
  indivListing: {orders: {}[]}
  _isMounted: boolean,
}

class Fulfillment extends React.Component<FulfillProps, FulfillState> {
  constructor(props: FulfillProps) {
    super(props)

    this.state = {
      listings: [{
        id: '',
        title: '',
        price: 0,
        orders: [{
          id: '',
          fulfillmentMethod: '',
          quantity: 0,
          user: {
            firstName: '',
            lastName: '',
          }
        }]
      }],
      profileID: window.location.pathname.slice(13, 49),
      orderedListing: [{listings: {}}],
      indivListing: {orders: [{}]},
      _isMounted: false,
    }

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  fetchOrders = async ():Promise<void> => {
    console.log(`PROFILEID: ${this.state.profileID}`);
    console.log(`USERID: ${this.props.userID}`)
    if (this.state.profileID === this.props.userID) {
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
        for (let i = 0; i < res.length; i++) {
          this.setState({
            indivListing: res[i]
          })
          console.log(this.state.indivListing.orders.length >= 1)
          if (this.state.indivListing.orders.length >= 1) {
            this.setState({
              orderedListing: [{listings: {...this.state.indivListing}}]
            })
          }
        }
      })
      .catch(error => console.log(error))
    }
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
  }

  componentDidUpdate(prevProps:Readonly<FulfillProps>, prevState:Readonly<FulfillState>) {
    if (this.props.userID !== prevProps.userID) {
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
      <OrdersContainer>
        <OrdersWrapper>
          <ListingCards>
            <FulfillmentMap orderedListing={this.state.orderedListing} />
          </ListingCards>
        </OrdersWrapper>
      </OrdersContainer>
    )
  }
}

export default Fulfillment;