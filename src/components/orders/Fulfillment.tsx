import React from "react";
import APIURL from "../helpers/environments";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import FulfillmentMap from "./FulfillmentMap";
import { Center, Container, Paper, Title } from "@mantine/core";
import { BannerH1 } from "../landing/LandingElements";
import { Banner } from "./OrdersElements";

export type FulfillProps = {
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  mapInfo: AppProps['mapInfo'],
  setMapInfo: AppProps['setMapInfo'],
  setWindowPath: AppProps['setWindowPath'],
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
    console.log(`USERID: ${this.props.user.id}`)
    if (this.state.profileID === this.props.user.id) {
      await fetch(`${APIURL}/order/fulfillment/${this.state.profileID}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.props.sessionToken}`
        })
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          orders: [...res]
        })
      })
      .catch(error => console.log(error))
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
    })
    window.scrollTo(0, 0);
    this.fetchMapInfo();
    if (this.props.mapInfo.fulfillment.length > 0) {
      this.fetchOrders();
    }
    this.props.setWindowPath('order')
  }

  componentDidUpdate(prevProps:Readonly<FulfillProps>, prevState:Readonly<FulfillState>) {
    if (this.props.user.id !== prevProps.user.id) {
      this.fetchMapInfo();
      this.fetchOrders();
    }
    if (this.props.mapInfo.fulfillment.length !== prevProps.mapInfo.fulfillment.length) {
      this.fetchMapInfo();
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
        <Banner>
          <BannerH1>Fulfillment</BannerH1>
        </Banner>
        {this.props.mapInfo.fulfillment.length < 1 ?
          <Paper sx={{background: '#05386b', padding: '40px 50px'}} radius='lg' mt={90}>
            <Center>
              <Title order={1} sx={{fontWeight: '500', color: '#edf5e1'}}>You don't have any orders to fulfill, yet!&#128577;</Title>
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