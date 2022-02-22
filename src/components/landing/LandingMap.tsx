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
import { LandingState } from "./Landing";
import { Avatar, Badge, Card, CardSection, Center, Grid, Group, Image, MediaQuery, Title } from "@mantine/core";
import { Link} from "react-router-dom";

let fixedCheckedTags: string[] = [];
const dashRegex: RegExp = /-/g;

type MapState = {
  divClicked: boolean,
  _isMounted: boolean,
}

type MapProps = {
  results: LandingState['results'],
  tags: LandingState['tags'],
}

let tagSrc:string = '';

class LandingMap extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
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

  fixCheckedTags = () => {
    fixedCheckedTags = this.props.tags.map(tag => {
      tag = tag.replaceAll(dashRegex, ' ')
      tag = tag.charAt(0).toUpperCase() + tag.slice(1)
      return (
        tag
      )
    })

    return (
      fixedCheckedTags
    )
  }

  mapListings = () => {
    return (
      this.state._isMounted && this.props.results.map((listing) => {
        this.fixCheckedTags();
        if (fixedCheckedTags.every(filter => listing.tag.includes(filter))) {
          return (
            <MediaQuery key={listing.id} query="(min-width: 1201px) and (max-width: 1400px)" styles={{maxWidth: '375px', transition: 'all 0.2s ease-in-out'}}>
              <Grid.Col ml='auto' mr='auto' className='landingGrid' span={4} md={4} lg={3} xl={2}>
                  <Card component={Link} to={`/listing/${listing.id}`} replace={true} radius='lg' sx={{background: '#edf5e1', cursor: 'pointer'}} >
                    <Center>
                      <Title sx={{fontWeight: '400', color: '#05386b'}} order={1}>{listing.title}</Title>
                    </Center>
                    <CardSection sx={{margin: '0 auto'}}>
                      <Image src={listing.image} alt={listing.title} width={400} height={250}/>
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
              </Grid.Col>
            </MediaQuery>
          )
        }
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
    });
  }

  render(): React.ReactNode {
    return (
      <Grid gutter={100} mt={localStorage.getItem('Authorization') ? 15 : 10}>
        {this.props.results[0].id !== '' && this.mapListings()}
      </Grid>
    )
  }
}

export default LandingMap;