import React from "react";
import { AppProps } from "../../App";
import { ListingCard, ListingContainer, ListingDescription, ListingH1, ListingImage, ListingPrice, ListingTag, ListingTagContainer, ListingWrapper } from "./ListingElements";

export type ListingProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  fetchData: AppProps['fetchData'],
}

class ListingById extends React.Component<{
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  fetchData: AppProps['fetchData']
}, ListingProps> {
  constructor(props: ListingProps) {
    super(props)

    this.state = {
      userID: this.props.userID,
      sessionToken: this.props.sessionToken,
      isLoggedIn: this.props.isLoggedIn,
      userName: this.props.userName,
      fetchData: this.props.fetchData
    }
  }

  componentDidMount() {

  }

  render(): React.ReactNode {
      return (
        <ListingContainer>
          <ListingWrapper>
            <ListingCard>
              <ListingH1>Title</ListingH1>
              <ListingImage />
              <ListingDescription>Description</ListingDescription>
              <ListingPrice>Price</ListingPrice>
              <ListingTagContainer>
                <ListingTag>Tag</ListingTag>
              </ListingTagContainer>
            </ListingCard>
          </ListingWrapper>
        </ListingContainer>
      )
  }
}

export default ListingById;