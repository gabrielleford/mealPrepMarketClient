import React from "react";
import { Navigate } from "react-router-dom";
import { ListingCard, ListingH1, ListingImg, ListingPrice, ListingTag, ListingTagContainer, RouteLink } from "../ReusableElements";
import { UserState } from "./UserProfile";

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

  mapListings = () => {
    return(
      this.state._isMounted && this.props.listings.map((listing):JSX.Element => {
        return(
          <RouteLink href={`/listing/${listing.id}`} key={listing.id}>
            <ListingCard>
              <ListingH1>{listing.title}</ListingH1>
              <ListingImg src={listing.image} />
              <ListingPrice>${listing.price} USD</ListingPrice>
              <ListingTagContainer>
                {/* <ListingTag /> */}
              </ListingTagContainer>
            </ListingCard>
          </RouteLink>
        )
      })
    )
  }

  render(): React.ReactNode {
    return (
      <>
        {this.props.listings && this.mapListings()}
      </>
    )
  }
}

export default UserProfileMap;