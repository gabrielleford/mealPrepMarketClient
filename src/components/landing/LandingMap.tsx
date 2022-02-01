import React from "react";
import { LandingState } from "./Landing";
import { LandingCard, LandingH1, LandingImg, LandingPrice } from "./LandingElements";

type MapState = {
  title: string,
  image: string,
  price: number,
  tag: string,
  _isMounted: boolean,
}

type MapProps = {
  results: LandingState['results'],
}

class LandingMap extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props)

    this.state = {
      title: '',
      image: '',
      price: 0,
      tag: '',
      _isMounted: false,
    }

    this.mapListings = this.mapListings.bind(this);
  }

  mapListings = () => {
    return (
      this.state._isMounted && this.props.results.map((listing): JSX.Element => {
        console.log(listing)
        return (
          <LandingCard>
            <LandingH1>{listing.title}</LandingH1>
            <LandingImg src="https://via.placeholder.com/200x150" />
            <LandingPrice>{listing.price}</LandingPrice>
            <LandingPrice>{listing.tag}</LandingPrice>
          </LandingCard>
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
    });
  }

  render(): React.ReactNode {
    return (
      <>
        {this.props.results && this.mapListings()}
      </>
    )
  }
}

export default LandingMap;