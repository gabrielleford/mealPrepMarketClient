import React from "react";
import APIURL from "../helpers/environments";
import { ListingCards } from "../ReusableElements";
import { LandingContainer, LandingWrapper } from './LandingElements'
import LandingMap from "./LandingMap";

export type LandingState = {
  results: {
    id: string,
    title: string,
    image: string,
    price: number,
    tag: string,
  }[],
  _isMounted: boolean,
}

class Landing extends React.Component<{}, LandingState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      results: [{
        id: '',
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
          <ListingCards>
            {this.state.results && <LandingMap results={this.state.results} />}
          </ListingCards>
        </LandingWrapper>
      </LandingContainer>
    )
  }
}

export default Landing;