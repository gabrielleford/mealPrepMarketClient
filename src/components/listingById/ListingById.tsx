import React from "react";
import APIURL from "../helpers/environments";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ButtonDiv, Delivery, EditDelete, ListingContainer, IndivListingDescription, ListingForm, IndivListingH1, IndivListingImg, ListingLabel, IndivListingPrice, IndivListingTag, IndivListingTagContainer, ListingUser, ListingWrapper, Pickup, QuantityOption, QuantitySelect, ListingUserDiv, PreppedBy } from "./ListingElements";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";

type ListingProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  userName: AppProps['userName'],
  what: AppProps['what'],
  listingEdit: AppProps['listingEdit'],
  dlt: AppProps['dlt'],
  fetchData: AppProps['fetchData'],
  setWhat: AppProps['setWhat'],
  setListingEdit: AppProps['setListingEdit'],
  setDelete: AppProps['setDelete'],
}

export type ListingState = {
  listingID: string,
  title: string,
  description: string,
  image: string,
  price: number,
  tag: string,
  ownerID: string,
  ownerName: string,
  userClicked: boolean,
  _isMounted: boolean,
}

class ListingById extends React.Component<ListingProps, ListingState> {
  constructor(props: ListingProps) {
    super(props)

    this.state = {
      listingID: window.location.pathname.slice(9, 45),
      title: '',
      description: '',
      image: '',
      price: 0,
      tag: '',
      ownerID: '',
      ownerName: '',
      userClicked: false,
      _isMounted: false,
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
      this.state._isMounted && this.setState({
        title: res.title,
        description: res.description,
        image: res.image,
        price: res.price,
        tag: res.tag,
        ownerID: res.userId,
        ownerName: `${res.user.firstName} ${res.user.lastName}`
      })
      this.props.setWhat('listing');
    })
  }

  editListing = () => {
    this.props.setListingEdit(!this.props.listingEdit);
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.state._isMounted && this.props.fetchData();
    this.fetchListing();
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
    this.props.setDelete(false);
  }

  render(): React.ReactNode {
      return (
        <ListingContainer>
          {this.props.dlt && 
            <ConfirmDelete what={this.props.what} listingID={this.state.listingID} sessionToken={this.props.sessionToken} setDelete={this.props.setDelete} />
          }
          <ListingWrapper>
            <IndivListingH1>{this.state.title}</IndivListingH1>
            {this.state.ownerID === this.props.userID ? '' :
              <ListingUserDiv>
                <PreppedBy>Prepared by </PreppedBy>
                <ListingUser onClick={() => this.setState({userClicked: true})}>
                  {this.state.ownerName}
                </ListingUser>
              </ListingUserDiv>
            }
            <IndivListingImg listingEdit={this.props.listingEdit} src="https://via.placeholder.com/400x250" alt={this.state.title}/>
            <IndivListingDescription>{this.state.description}</IndivListingDescription>
            <IndivListingTagContainer>
              {/* <IndivListingTag /> */}
            </IndivListingTagContainer>
            <IndivListingPrice>${this.state.price} USD</IndivListingPrice>
            {this.state.ownerID === this.props.userID ? 
            <>
              <ButtonDiv>
                <EditDelete onClick={this.editListing}>Edit</EditDelete>
                <EditDelete onClick={() => this.props.setDelete(true)}>Delete</EditDelete>
              </ButtonDiv>
            </> :
            <ListingForm>
              <ListingLabel>Quantity</ListingLabel>
              <QuantitySelect name='quantity'>
                <QuantityOption value={1}>1</QuantityOption>
                <QuantityOption value={2}>2</QuantityOption>
                <QuantityOption value={3}>3</QuantityOption>
                <QuantityOption value={4}>4</QuantityOption>
              </QuantitySelect>
              <Pickup>Pickup</Pickup>
              <Delivery>Delivery</Delivery>
            </ListingForm>
          }
          </ListingWrapper>
          {this.props.listingEdit ? 
          <Navigate to={`/listing/edit/${this.state.listingID}`} replace={true}/> : 
          this.state.userClicked ? 
          <Navigate to={`/profile/${this.state.ownerID}`} replace={true} /> : ''
          }
        </ListingContainer>
      )
  }
}

export default ListingById;