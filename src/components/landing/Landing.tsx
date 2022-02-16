import React from "react";
import APIURL from "../helpers/environments";
import { AppProps } from "../../App";
import LandingMap from "./LandingMap";
import { Banner, BannerButton, BannerH1, BannerP } from './LandingElements'
import { Container } from "@mantine/core";

export type LandingProps = {
  sessionToken: AppProps['sessionToken'],
  setPrevPath: AppProps['setPrevPath'],
  setResponse: AppProps['setResponse'],
}

export type LandingState = {
  results: {
    id: string,
    title: string,
    image: string,
    price: number,
    tag: string[],
  }[],
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
      _isMounted: false,
    }
  }

  fetchListings = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/`, {
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
    this.props.setResponse(0);
    this.props.setPrevPath('/');
    this.fetchListings();
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render(): React.ReactNode {
    return (
      <Container style={{ margin:'0 auto'}} fluid={true}>
        <Banner sessionToken={this.props.sessionToken}>
          <BannerH1>Making Your Life Easier</BannerH1>
          <BannerP>Join today to order high-quality <br/> meals from preppers near you.</BannerP>
          <BannerButton to='/login'>Get Started!</BannerButton>
        </Banner>
        {this.state.results[0].id !== '' && <LandingMap results={this.state.results} />}
      </Container>
    )
  }
}

export default Landing;

      // <LandingContainer>
      //   {!localStorage.getItem('Authorization') && 
      //     <Banner>
      //       <BannerH1>Making Your Life Easier</BannerH1>
      //       <BannerP>Join today to order high-quality <br/> meals from preppers near you.</BannerP>
      //       <BannerButton to='/login'>Get Started!</BannerButton>
      //     </Banner>
      //   }
      //   <LandingWrapper sessionToken={this.props.sessionToken}>
      //     <ListingCards>
      //       {this.state.results[0].id !== '' && <LandingMap results={this.state.results} />}
      //     </ListingCards>
      //   </LandingWrapper>
      // </LandingContainer>