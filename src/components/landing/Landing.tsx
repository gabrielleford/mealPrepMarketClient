import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
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
import LandingMap from "./LandingMap";
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Banner, BannerButton, BannerH1, BannerP, FilterBar } from './LandingElements'
import { Container, Group, Image, Title } from "@mantine/core";
import { CreateInput, TagLabel } from "./LandingElements";

export type LandingProps = {
  sessionToken: AppProps['sessionToken'],
  setPrevPath: AppProps['setPrevPath'],
  setDlt: AppProps['setDlt'],
  setEndpointID: AppProps['setEndpointID'],
  setResponse: AppProps['setResponse'],
  setWhat: AppProps['setWhat'],
}

export type LandingState = {
  results: {
    id: string,
    title: string,
    image: string,
    price: number,
    tag: string[],
  }[],
  tags: string[],
  _isMounted: boolean,
}

class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props)

    this.state = {
      results: [{
        id: '',
        title: '',
        image: '',
        price: 0,
        tag: [],
      }],
      tags: [],
      _isMounted: false,
    }
  }

  handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checkedTags:string[] = [...this.state.tags, e.target.id];
    if (this.state.tags.includes(e.target.id)) {
      checkedTags = checkedTags.filter(tag => tag !== e.target.id)
    }
    checkedTags = checkedTags.sort();
    this.setState({
      tags: checkedTags
    })
  }

  fetchListings = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => {
      this.state._isMounted && this.setState({
        results: [...res]
      })
    })
    .catch(error => console.log(error))
  }

  fetchTags = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/tag?tag=Vegan&tag=Low%20Carb`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
    this.props.setPrevPath('/');
    this.fetchListings();
    this.props.setDlt(false);
    this.props.setEndpointID('');
    this.props.setResponse(0);
    this.props.setWhat('');
    this.setState({
      tags: []
    })
  }

  componentDidUpdate(prevProps:Readonly<LandingProps>, prevState:Readonly<LandingState>) {

  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render(): React.ReactNode {
    return (
      <Container style={{ marginTop:'0', marginBottom: '8rem', marginLeft:'auto', marginRight: 'auto'}} fluid={true}>
        <Banner sessionToken={this.props.sessionToken}>
          <BannerH1>Making Your Life Easier</BannerH1>
          <BannerP>Join today to order high-quality <br/> meals from preppers near you.</BannerP>
          <BannerButton to='/login'>Get Started!</BannerButton>
        </Banner>
        {/* <FilterBar sessionToken={this.props.sessionToken}>
          <Group position="center" mt='xl'>
            <Title order={3} sx={{color: '#edf5e1', fontWeight: '400' }}>Filter Meals</Title>
            <HiArrowNarrowRight/>
            <Group mr={100}>
              <TagFilter handleTag={this.handleTag}/>
            </Group>
          </Group>
        </FilterBar> */}
        {this.state.results[0].id !== '' && <LandingMap results={this.state.results} tags={this.state.tags} />}
      </Container>
    )
  }
}

export default Landing;

type TagProps = {
  handleTag: Landing['handleTag'],
}

class TagFilter extends React.Component<TagProps> {
  render(): React.ReactNode {
    return (
      <>
      <CreateInput id='Keto' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Keto">
        <Image className="tagImg" width={70} height={70} src={Keto} />
      </TagLabel>
      <CreateInput id='Low Carb' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Low Carb">
        <Image className="tagImg" width={70} height={70} src={LowCarb} />
      </TagLabel>
      <CreateInput id='Mediterranean' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Mediterranean">
        <Image className="tagImg" width={70} height={70} src={Mediterranean} />
      </TagLabel>
      <CreateInput id='Paleo' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Paleo">
        <Image className="tagImg" width={70} height={70} src={Paleo} />
      </TagLabel>
      <CreateInput id='Vegan' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Vegan">
        <Image className="tagImg" width={70} height={70} src={Vegan} />
      </TagLabel>
      <CreateInput id='Vegetarian' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Vegetarian">
        <Image className="tagImg" width={70} height={70} src={Vegetarian} />
      </TagLabel>
      <CreateInput id='Dairy Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Dairy Free">
        <Image className="tagImg" width={70} height={70} src={DairyFree} />
      </TagLabel>
      <CreateInput id='Egg Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Egg Free">
        <Image className="tagImg" width={70} height={70} src={EggFree} />
      </TagLabel>
      <CreateInput id='Gluten Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Gluten Free">
        <Image className="tagImg" width={70} height={70} src={GlutenFree} />
      </TagLabel>
      <CreateInput id='Nut Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Nut Free">
        <Image className="tagImg" width={70} height={70} src={NutFree} />
      </TagLabel>
      <CreateInput id='Soy Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Soy Free">
        <Image className="tagImg" width={70} height={70} src={SoyFree} />
      </TagLabel>
      <CreateInput id='Sugar Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="Sugar Free">
        <Image className="tagImg" width={70} height={70} src={SugarFree} />
      </TagLabel>
      </>
    )
  }
}