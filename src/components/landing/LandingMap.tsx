import React from "react";
import { LandingState } from "./Landing";
import { ListingCard, ListingH1, ListingImg, ListingPrice, ListingTagContainer, ListingTag } from "../ReusableElements";
import { Navigate } from "react-router-dom";

//TODO: Style & add routing to listing based on id

type MapState = {
  divClicked: boolean,
  _isMounted: boolean,
}

type MapProps = {
  results: LandingState['results'],
}

class LandingMap extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props)

    this.state = {
      divClicked: false,
      _isMounted: false,
    }

    this.mapListings = this.mapListings.bind(this);
  }

  mapListings = () => {
    return (
      this.state._isMounted && this.props.results.map((listing): JSX.Element => {
        return (
          <ListingCard key={listing.id} onClick={() => this.setState({divClicked: true})}>
            <ListingH1>{listing.title}</ListingH1>
            <ListingImg src="https://via.placeholder.com/200x150" />
            <ListingPrice>{listing.price}</ListingPrice>
            <ListingTagContainer>
            {/* <ListingTag src=""/> */}
            </ListingTagContainer>
            {this.state.divClicked && <Navigate to={`/listing/${listing.id}`} replace={true} />}
          </ListingCard>
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