import { Badge, Card, Center, Grid, Group, Text, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FulfillState } from "./Fulfillment";


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
          <Grid.Col span={4} key={order.id}>
              <Card radius='lg' sx={{background: '#edf5e1', cursor: 'pointer'}} component={Link} to={`/listing/${order.listingId}`} replace={true}>
                <Center>
                  <Title sx={{fontWeight: '400', color: '#05386b'}} order={1}>{order.listing.title}</Title>
                </Center>
                <Center>
                  <Text color='secondary'>Customer: {order.user.firstName} {order.user.lastName}</Text>
                </Center>
                <Group mt='md'>
                  <Badge variant='outline' radius='sm' color='secondary' sx={{paddingLeft: '3px', paddingRight: '3px'}}>Quantity</Badge> 
                  <Text className='cardText'>{order.quantity}</Text>
                </Group>
                <Group mt='sm'>
                  <Badge variant='outline' radius='sm' color='secondary' sx={{paddingLeft: '3px', paddingRight: '3px'}}>Order Total</Badge>
                  <Text className='cardText'> ${order.quantity * order.listing.price} USD</Text>
                </Group>
                <Group mt='sm'>
                  <Badge variant='outline' radius='sm' size="sm" color='secondary' sx={{paddingLeft: '3px', paddingRight: '3px'}}>Delivery Method</Badge> 
                  <Text className='cardText'>{order.fulfillmentMethod.charAt(0).toUpperCase() + order.fulfillmentMethod.slice(1)}</Text>
                </Group>
              </Card>
          </Grid.Col>
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
      <Grid justify='space-between' mt={100}>
        {this.props.orders[0].id !== '' && this.mapOrders()}
      </Grid>
    )
  }
}

export default FulfillmentMap;