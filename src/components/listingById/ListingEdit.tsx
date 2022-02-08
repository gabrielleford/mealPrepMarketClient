import React from "react";
import APIURL from '../helpers/environments'
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { AppProps } from "../../App";
import { ButtonDiv, EditDelete, ListingContainer, ListingForm, IndivListingH1, IndivListingImg, ListingInput, ListingLabel, ListingTextarea, ListingWrapper } from './ListingElements';
import { Navigate } from "react-router-dom";

export type EditState = {
  listingID: string,
  title: string,
  description: string,
  image: string,
  price: 0,
  tag: string,
  responseCode: number,
  _isMounted: boolean,
}

export type EditProps = {
  sessionToken: AppProps['sessionToken'],
  what: AppProps['what'],
  listingEdit: AppProps['listingEdit'],
  dlt: AppProps['dlt'],
  userID: AppProps['userID'],
  setWhat: AppProps['setWhat'],
  setListingEdit: AppProps['setListingEdit'],
  setDelete: AppProps['setDelete'],
  clearToken: AppProps['clearToken'],
}

class ListingEdit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props)

    this.state = {
      listingID: window.location.pathname.slice(14, 50),
      title: '',
      description: '',
      image: '',
      price: 0,
      tag: '',
      responseCode: 0,
      _isMounted: false,
      }
    

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
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
      })
    })
  }

  updateListing = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();

    await fetch(`${APIURL}/${this.state.listingID}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        tag: this.state.tag,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
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
      if (this.state.responseCode === 200) {
        this.props.setListingEdit(!this.props.listingEdit);
      }
    })
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    })
    this.fetchListing();
    this.props.setWhat('listing');
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
    return (
      <ListingContainer>
        {this.props.dlt && 
          <ConfirmDelete what={this.props.what} listingID={this.state.listingID} sessionToken={this.props.sessionToken} userID={this.props.userID} setDelete={this.props.setDelete} clearToken={this.props.clearToken} />
        }
        <ListingWrapper>
          <IndivListingH1>Edit Listing</IndivListingH1>
          <ListingForm onSubmit={this.updateListing}>
            <IndivListingImg listingEdit={this.props.listingEdit} src={this.state.image} alt={this.state.title} />
            <ListingLabel>Title</ListingLabel>
            <ListingInput name='title' value={this.state.title} onChange={this.handleChange} />
            <ListingLabel>Description</ListingLabel>
            <ListingTextarea name='description' value={this.state.description} onChange={this.handleChange} />
            <ListingLabel>Price</ListingLabel>
            <ListingInput name='price' value={this.state.price} onChange={this.handleChange} />
            <ListingLabel>Tags</ListingLabel>
            <ListingInput name='tag' value={this.state.tag} onChange={this.handleChange} />
            <ButtonDiv>
              <EditDelete type="submit">Save</EditDelete>  
              <EditDelete onClick={(e) => {
                e.preventDefault() 
                this.props.setDelete(true)}}>Delete</EditDelete>
            </ButtonDiv>
          </ListingForm>
        </ListingWrapper>
        {!this.props.listingEdit ?
        <Navigate to={`/listing/${this.state.listingID}`} replace={true} /> :
        !localStorage.getItem('Authorization') ?
        <Navigate to='/' replace={true} /> : ''
        }
      </ListingContainer>
    )
  }
}

export default ListingEdit;