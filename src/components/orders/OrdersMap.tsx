import { Badge, Button, Card, Center, Grid, Group, Image, Text, Title } from "@mantine/core";
import React from "react";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { RouteLink } from "../ReusableElements";
import { OrderProps, OrderState } from "./Orders";

type OrderMapState = {
  orderID: string,
  deleted: boolean,
  _isMounted: boolean,
}

type OrderMapProps = {
  orders: OrderState['orders'],
  app: OrderProps,
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

  orderMap = () => {
    return (
      this.state._isMounted && this.props.orders.map((order):JSX.Element => {
        return(
          <Grid.Col key={order.id} span={4}>
            <Card key={order.id}>
              <RouteLink href={`/listing/${order.listing.id}`}>
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
              </RouteLink>
              <Center mt='lg'>
                <Button className="darkButton" size="lg" radius='md' compact 
                  onClick={() => {
                    this.props.app.setEndpointID(order.id)
                    this.props.app.setDlt(true)}}>Cancel Order</Button>
              </Center>
            </Card>
            {this.props.app.dlt && <ConfirmDelete sessionToken={this.props.app.sessionToken} what={this.props.app.what} dlt={this.props.app.dlt} setDlt={this.props.app.setDlt} endpointID={this.props.app.endpointID} setEndpointID={this.props.app.setEndpointID} response={this.props.app.response} setResponse={this.props.app.setResponse} clearToken={this.props.app.clearToken}/>}
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
    if (this.props.app.response !== prevProps.app.response && this.props.app.response === 200){
      this.props.fetchOrders();
      this.orderMap();
      this.props.app.setResponse(0);
      this.props.app.setDlt(false);
      this.props.app.setEndpointID('');
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