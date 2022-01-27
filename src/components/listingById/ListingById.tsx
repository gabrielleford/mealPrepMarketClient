import React from "react";
import { AppProps } from "../../App";
import APIURL from "../helpers/environments";
import { ListingContainer, ListingDescription, ListingH1, ListingImage, ListingPrice, ListingTag, ListingTagContainer, ListingUser, ListingWrapper } from "./ListingElements";

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
            <ListingH1>{this.state.title}</ListingH1>
            <ListingUser>Prepared by {}</ListingUser>
            <ListingImage src="https://via.placeholder.com/400x250" alt={this.state.title}/>
            <ListingDescription>{this.state.description}</ListingDescription>
            <ListingTagContainer>
              {/* <ListingTag>Tag</ListingTag> */}
            </ListingTagContainer>
            <ListingPrice>{this.state.price}</ListingPrice>
          </ListingWrapper>
        </ListingContainer>
      )
  }
}

export default ListingById;