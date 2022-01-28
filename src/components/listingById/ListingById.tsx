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
  listingEdit: AppProps['listingEdit'],
  what: AppProps['what'],
  fetchData: AppProps['fetchData'],
  setListingEdit: AppProps['setListingEdit'],
  setWhat: AppProps['setWhat'],
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
  delete: boolean,
  confirmDelete: () => void;
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
      delete: false,
      confirmDelete: () => {
        this.setState({
        delete: !this.state.delete,
        })
      },
      _isMounted: false,
    }
  }

  fetchListing = async ():Promise<void> => {
    console.log(this.props.userID);
    console.log(this.props.userName);

    await fetch(`${APIURL}/listing/${this.state.listingID}`,{
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
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
    this.props.setListingEdit(true);
    console.log('button clicked')
  }

  componentDidMount() {
    console.log(this.state.listingID);
    this.setState({
      _isMounted: true
    })
    this.state._isMounted && this.props.fetchData();
    this.fetchListing();
    console.log(this.props.listingEdit);
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
      return (
        <ListingContainer>
          {this.state.delete && 
            <ConfirmDelete what={this.props.what} listingID={this.state.listingID} confirmDelete={this.state.confirmDelete} />}
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
                <EditDelete onClick={this.state.confirmDelete}>Delete</EditDelete>
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