import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
import LandingMap from "./LandingMap";
import { Banner, BannerButton, BannerH1, BannerP, FilterBar } from './LandingElements'
import { Container, Group } from "@mantine/core";
import { CreateInput, TagLabel } from "./LandingElements";
import Filter from "../filterAside/FilterAside";

export type LandingProps = {
  sessionToken: AppProps['sessionToken'],
  filterOpen: AppProps['filterOpen'],
  setFilterOpen: AppProps['setFilterOpen'],
  setWindowPath: AppProps['setWindowPath'],
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
        <FilterBar sessionToken={this.props.sessionToken}>
          <Group position="center" mt='xl'>
            <TagFilter handleTag={this.handleTag}/>
          </Group>
        </FilterBar>
        <Filter handleTag={this.handleTag} filterOpen={this.props.filterOpen} setFilterOpen={this.props.setFilterOpen}/>
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
      <Group>
        <CreateInput id='Keto' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Keto">
          Keto
        </TagLabel>
        <CreateInput id='Low Carb' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Low Carb">
          Low Carb
        </TagLabel>
        <CreateInput id='Mediterranean' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Mediterranean">
          Mediterranean
        </TagLabel>
        <CreateInput id='Paleo' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Paleo">
          Paleo
        </TagLabel>
        <CreateInput id='Vegan' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Vegan">
          Vegan
        </TagLabel>
        <CreateInput id='Vegetarian' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Vegetarian">
          Vegetarian
        </TagLabel>
      </Group>
      <Group>
        <CreateInput id='Dairy Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Dairy Free">
          Dairy Free
        </TagLabel>
        <CreateInput id='Egg Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Egg Free">
          Egg Free
        </TagLabel>
        <CreateInput id='Gluten Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Gluten Free">
          Gluten Free
        </TagLabel>
        <CreateInput id='Nut Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Nut Free">
          Nut Free
        </TagLabel>
        <CreateInput id='Soy Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Soy Free">
          Soy Free
        </TagLabel>
        <CreateInput id='Sugar Free' type='checkbox' onChange={this.props.handleTag}/>
        <TagLabel htmlFor="Sugar Free">
          Sugar Free
        </TagLabel>
      </Group>
      </>
    )
  }
}