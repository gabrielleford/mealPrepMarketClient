import React from "react";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { LandingContainer, LandingWrapper } from './LandingElements'
import LandingMap from "./LandingMap";

export type LandingState = {
  results: {
    title: string,
    image: string,
    price: number,
    tag: string,
  }[],
  _isMounted: boolean,
}

export type LandingProps = {
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  fetchData: AppProps['fetchData']
}

class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props)

    this.state = {
      results: [{
        title: '',
        image: '',
        price: 0,
        tag: '',
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
    this.fetchListings();
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render(): React.ReactNode {
    return (
      <LandingContainer>
        <LandingWrapper>
          {this.state.results && <LandingMap results={this.state.results} />}
        </LandingWrapper>
      </LandingContainer>
    )
  }
}

export default Landing;