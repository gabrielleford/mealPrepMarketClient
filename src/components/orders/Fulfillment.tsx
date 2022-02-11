import React from "react";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { ListingCards } from "../ReusableElements";
import FulfillmentMap from "./FulfillmentMap";
import { OrdersContainer, OrdersWrapper } from "./OrdersElements";

export type FulfillProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  fetchData: AppProps['fetchData'],
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
      <OrdersContainer>
        <OrdersWrapper>
          <ListingCards>
            <FulfillmentMap orders={this.state.orders} />
          </ListingCards>
        </OrdersWrapper>
        {!localStorage.getItem('Authorization') && <Navigate to='/' replace={true} />}
      </OrdersContainer>
    )
  }
}

export default Fulfillment;