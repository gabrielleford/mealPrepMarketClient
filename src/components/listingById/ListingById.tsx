import { rmSync } from "fs";
import React from "react";
import { AppProps } from "../../App";
import { CreateProps } from "../createListing/CreateListing";
import APIURL from "../helpers/environments";
import { ListingCard, ListingContainer, ListingDescription, ListingH1, ListingPrice, ListingTag, ListingTagContainer, ListingWrapper } from "./ListingElements";

export type ListingProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  fetchData: AppProps['fetchData'],
  listingID: string,
  title: string,
  description: string,
  image: string,
  price: number,
  tag: string,
}

class ListingById extends React.Component<{
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  fetchData: AppProps['fetchData'],
}, ListingProps> {
  constructor(props: ListingProps) {
    super(props)

    this.state = {
      userID: this.props.userID,
      sessionToken: this.props.sessionToken,
      isLoggedIn: this.props.isLoggedIn,
      userName: this.props.userName,
      fetchData: this.props.fetchData,
      listingID: window.location.pathname.slice(9, 45),
      title: '',
      description: '',
      image: '',
      price: 0,
      tag: '',
    }
  }

  fetchListing = async ():Promise<void> => {
    await fetch(`${APIURL}/listing/${this.state.listingID}`,{
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        title: res.title,
        description: res.description,
        image: res.image,
        price: res.price,
        tag: res.tag,
      })
    })
  }

  componentDidMount() {
    console.log(this.state.listingID);
    this.props.fetchData();
    this.fetchListing();
  }

  render(): React.ReactNode {
      return (
        <ListingContainer>
          <ListingWrapper>
            <ListingCard>
              <ListingH1>{this.state.title}</ListingH1> 
              <ListingDescription>{this.state.description}</ListingDescription>
              <ListingPrice>{this.state.price}</ListingPrice>
              <ListingTagContainer>
                {/* <ListingTag>Tag</ListingTag> */}
              </ListingTagContainer>
            </ListingCard>
          </ListingWrapper>
        </ListingContainer>
      )
  }
}

export default ListingById;