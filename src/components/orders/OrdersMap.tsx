import { Badge, Button, Card, Center, Grid, Group, Image, Text, Title } from "@mantine/core";
import React from "react";
import { Navigate } from "react-router-dom";
import APIURL from "../helpers/environments";
import { RouteLink } from "../ReusableElements";
import { OrderProps, OrderState } from "./Orders";

type OrderMapState = {
  orderID: string,
  deleted: boolean,
  _isMounted: boolean,
}

type OrderMapProps = {
  orders: OrderState['orders']
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
          <Grid.Col key={order.id} span={4}>
            <RouteLink href={`/listing/${order.listing.id}`}>
              <Card key={order.id}>
                <Title className="listingTitle" align="center" order={1}>{order.listing.title}</Title>
                <Center>
                  <Image width={275} height={275} radius={10} src={order.listing.image} />
                </Center>
                <Center>
                  <Group direction="column" spacing={0}>
                    <Text className='cardText' size="lg" mt='lg'><Badge variant='outline' radius='sm' size="lg" color='secondary' sx={{paddingLeft: '3px', paddingRight: '3px'}}>Order Total</Badge> ${order.quantity * order.listing.price} USD</Text>
                    <Text className='cardText' size="lg" mt='md'><Badge variant='outline' radius='sm' size="lg" color='secondary' sx={{paddingLeft: '3px', paddingRight: '3px'}}>Delivery Method</Badge> {order.fulfillmentMethod.charAt(0).toUpperCase() + order.fulfillmentMethod.slice(1)}</Text>
                  </Group>
                </Center>
                <Center mt='lg'>
                  <Button className="darkButton" size="lg" radius='md' compact>Cancel Order</Button>
                </Center>
              </Card>
            </RouteLink>
            {this.props.orders.length < 1 && <Navigate to='/' replace={true} />}
          </Grid.Col>
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
      <Grid mt='xl'>
      {this.props.orders && this.orderMap()}
      </Grid>
    )
  }
}

export default OrdersMap;

{/*<CancelOrder onClick={() => this.cancelOrder(order.id)}>*/}