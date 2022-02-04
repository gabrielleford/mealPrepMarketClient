import React from "react";
import APIURL from "../helpers/environments";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ButtonDiv, Delivery, EditDelete, ListingContainer, IndivListingDescription, ListingForm, IndivListingH1, IndivListingImg, ListingLabel, IndivListingPrice, IndivListingTag, IndivListingTagContainer, ListingUser, ListingWrapper, Pickup, QuantityOption, QuantitySelect, ListingUserDiv, PreppedBy, SubmitOrder, Para } from "./ListingElements";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { GetStarted } from "../ReusableElements";

type ListingProps = {
  userID: AppProps['userID'],
  sessionToken: AppProps['sessionToken'],
  userName: AppProps['userName'],
  what: AppProps['what'],
  listingEdit: AppProps['listingEdit'],
  dlt: AppProps['dlt'],
  fetchData: AppProps['fetchData'],
  setWhat: AppProps['setWhat'],
  setListingEdit: AppProps['setListingEdit'],
  setDelete: AppProps['setDelete'],
  clearToken: AppProps['clearToken'],
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
  quantity: number,
  fulfillmentMethod: string,
  responseCode: number,
  getStarted: boolean,
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
      quantity: 1,
      fulfillmentMethod: 'pickup',
      responseCode: 0,
      getStarted: false,
      userClicked: false,
      _isMounted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.setFulfillment = this.setFulfillment.bind(this);
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
      this.state._isMounted && this.props.setWhat('listing');
      console.log(res.id);
    })
    .catch(error => console.log(error))
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      quantity: +e.target.value
    })
  }

  placeOrder = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();

    await fetch(`${APIURL}/order/${this.state.listingID}`, {
      method: 'POST',
      body: JSON.stringify({
        order: {
          quantity: this.state.quantity,
          fulfillmentMethod: this.state.fulfillmentMethod,
          listingOwner: this.state.ownerID,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      this.state._isMounted && this.setState({
        responseCode: res.status
      })
      return res.json()
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  }

  editListing = () => {
    this.props.setListingEdit(!this.props.listingEdit);
  }

  setFulfillment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (this.state.fulfillmentMethod === 'delivery'){
      this.setState({
        fulfillmentMethod: 'pickup' 
      })
    } else {
      this.setState({
        fulfillmentMethod: 'delivery'
      })
    }
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.props.fetchData();
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
            <ConfirmDelete what={this.props.what} listingID={this.state.listingID} sessionToken={this.props.sessionToken} userID={this.props.userID} setDelete={this.props.setDelete} clearToken={this.props.clearToken} />
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
            </> : localStorage.getItem('Authorization') ?
            <ListingForm onSubmit={this.placeOrder}>
              <ListingLabel>Quantity</ListingLabel>
              <QuantitySelect name='quantity' onChange={this.handleChange}>
                <QuantityOption value={1}>1</QuantityOption>
                <QuantityOption value={2}>2</QuantityOption>
                <QuantityOption value={3}>3</QuantityOption>
                <QuantityOption value={4}>4</QuantityOption>
              </QuantitySelect>
              <ButtonDiv>
                <Pickup onClick={this.setFulfillment}>Pickup</Pickup>
                <Delivery onClick={this.setFulfillment}>Delivery</Delivery>
              </ButtonDiv>
              <SubmitOrder type="submit">Place Order</SubmitOrder>
            </ListingForm> :
            <>
            <Para>Interested in ordering?</Para>
            <GetStarted onClick={() => this.setState({getStarted: true})}>Get Started!</GetStarted>
            </>
          }
          </ListingWrapper>
          {this.props.listingEdit ? 
          <Navigate to={`/listing/edit/${this.state.listingID}`} replace={true}/> : 
          this.state.userClicked ? 
          <Navigate to={`/profile/${this.state.ownerID}`} replace={true} /> : 
          this.state.responseCode === 201 ?
          <Navigate to={`/orders/${this.props.userID}`} replace={true} /> : 
          this.state.getStarted ?
          <Navigate to={'/login'} replace={true} /> : ''
          }
        </ListingContainer>
      )
  }
}

export default ListingById;