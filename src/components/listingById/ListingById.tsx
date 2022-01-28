import React from "react";
import APIURL from "../helpers/environments";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ButtonDiv, Delivery, EditDelete, ListingContainer, ListingDescription, ListingForm, ListingH1, ListingImage, ListingLabel, ListingPrice, ListingTag, ListingTagContainer, ListingUser, ListingWrapper, Pickup, QuantityOption, QuantitySelect } from "./ListingElements";
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
            <ListingH1>{this.state.title}</ListingH1>
            {this.state.ownerID === this.props.userID ? '' : 
              <ListingUser>Prepared by {this.state.ownerName}</ListingUser>
            }
            <ListingImage listingEdit={this.props.listingEdit} src="https://via.placeholder.com/400x250" alt={this.state.title}/>
            <ListingDescription>{this.state.description}</ListingDescription>
            <ListingTagContainer>
              {/* <ListingTag>Tag</ListingTag> */}
            </ListingTagContainer>
            <ListingPrice>${this.state.price} USD</ListingPrice>
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
          {this.props.listingEdit && <Navigate to={`/listing/edit/${this.state.listingID}`} replace={true}/>}
        </ListingContainer>
      )
  }
}

export default ListingById;