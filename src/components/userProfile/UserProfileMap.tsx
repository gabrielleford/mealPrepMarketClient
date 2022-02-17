import { Avatar, Badge, Card, CardSection, Center, Grid, Group, Image, Title } from "@mantine/core";
import React from "react";
import Keto from '../../assets/mealPrepMarketLightIconK.png';
import LowCarb from '../../assets/mealPrepMarketLightIconLC.png';
import Mediterranean from '../../assets/mealPrepMarketLightIconM.png';
import Paleo from '../../assets/mealPrepMarketLightIconP.png';
import Vegan from '../../assets/mealPrepMarketLightIconV.png';
import Vegetarian from '../../assets/mealPrepMarketLightIconVeg.png';
import DairyFree from '../../assets/mealPrepMarketLightIconDF.png';
import EggFree from '../../assets/mealPrepMarketLightIconEF.png';
import GlutenFree from '../../assets/mealPrepMarketLightIconGF.png';
import NutFree from '../../assets/mealPrepMarketLightIconNF.png';
import SoyFree from '../../assets/mealPrepMarketLightIconSoyF.png';
import SugarFree from '../../assets/mealPrepMarketLightIconSF.png';
import { RouteLink } from "../ReusableElements";
import { UserState } from "./UserProfile";

let tagSrc:string = '';

type UserMapState = {
  divClicked: boolean,
  _isMounted: boolean,
}

type UserMapProps = {
  listings: UserState['listings'],
}

class UserProfileMap extends React.Component<UserMapProps, UserMapState> {
  constructor(props: UserMapProps) {
    super(props)

    this.state = {
      divClicked: false,
      _isMounted: false,
    }

    this.mapListings = this.mapListings.bind(this);
  }

  tagImages = (tag: string) => {
    switch(tag) {
      case 'Keto':
        tagSrc = Keto
        break;
      case 'Low Carb':
        tagSrc = LowCarb
        break;
      case 'Mediterranean':
        tagSrc = Mediterranean
        break;
      case 'Paleo':
        tagSrc = Paleo
        break;
      case 'Vegan':
        tagSrc = Vegan
        break;
      case 'Vegetarian':
        tagSrc = Vegetarian
        break;
      case 'Dairy Free':
        tagSrc = DairyFree
        break;
      case 'Egg Free':
        tagSrc = EggFree
        break;
      case 'Gluten Free':
        tagSrc = GlutenFree
        break;
      case 'Nut Free':
        tagSrc = NutFree
        break;
      case 'Soy Free':
        tagSrc = SoyFree
        break;
      case 'Sugar Free':
        tagSrc = SugarFree
        break;
      default:
        tagSrc= ''
    }
    return (
      tagSrc
    )
  }

  mapListings = () => {
    return(
      this.state._isMounted && this.props.listings.map((listing):JSX.Element => {
        return(
          <Grid.Col span={3} key={listing.id}>
          <RouteLink href={`/listing/${listing.id}`}>
            <Card radius='lg' sx={{background: '#edf5e1'}}>
              <Center>
                <Title sx={{fontWeight: '400', color: '#05386b'}} order={1}>{listing.title}</Title>
              </Center>
              <CardSection>
                <Image src={listing.image} alt={listing.title} width={250} height={150}/>
              </CardSection>
              <Center>
                <Badge mt='sm' size="lg" variant="filled" color='secondary'>${listing.price} USD</Badge>
              </Center>
              {listing.tag.length > 0 &&                  
                <Group mt='lg' position="center">
                  {listing.tag.map(tag => {
                    this.tagImages(tag)
                    return(
                      <Avatar key={tag} src={tagSrc} alt={tag} />
                    )
                  })}
                </Group>
              }
            </Card>
          </RouteLink>
        </Grid.Col>
        )
      })
    )
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    })
  }


  render(): React.ReactNode {
    return (
      <Grid mt='xl'>
        {this.props.listings && this.mapListings()}
      </Grid>
    )
  }
}

export default UserProfileMap;