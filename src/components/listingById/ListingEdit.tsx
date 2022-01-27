import React from "react";
import APIURL from '../helpers/environments'
import { AppProps } from "../../App";
import { EditDelete, ListingContainer, ListingForm, ListingImage, ListingInput, ListingLabel, ListingTextarea, ListingWrapper } from './ListingElements';
import { Navigate } from "react-router-dom";

export type EditProps = {
  isLoggedIn: AppProps['isLoggedIn'],
  sessionToken: AppProps['sessionToken'],
  listingID: string,
  title: string,
  description: string,
  image: string,
  price: 0,
  tag: string,
  responseCode: number,
  listingEdit: AppProps['listingEdit'],
  setListingEdit: AppProps['setListingEdit'],
  _isMounted: boolean,
}

class ListingEdit extends React.Component<{
  isLoggedIn: AppProps['isLoggedIn'],
  sessionToken: AppProps['sessionToken'],
  listingEdit: AppProps['listingEdit'],
  setListingEdit: AppProps['setListingEdit'],
}, EditProps> {
  constructor(props: EditProps) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      sessionToken: this.props.sessionToken,
      listingID: window.location.pathname.slice(14, 50),
      title: '',
      description: '',
      image: '',
      price: 0,
      tag: '',
      responseCode: 0,
      listingEdit: this.props.listingEdit,
      setListingEdit: this.props.setListingEdit,
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

  updateListing = async ():Promise<void> => {
    await fetch(`${APIURL}/${this.state.listingID}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        desription: this.state.description,
        price: this.state.price,
        tag: this.state.tag,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      this.setState({
        responseCode: res.status
      })
      return res.json()
    })
    .then(res => {
      console.log(res);
    })
  }

  componentDidMount() {
    console.log(this.props.listingEdit);
    console.log('edit listing');
    this.setState({
      _isMounted: true
    })
    this.state._isMounted && this.fetchListing();
  }

  componentDidUpdate() {
    if (this.state.responseCode === 200) {
      this.props.setListingEdit(false);
    }
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    })
  }

  render(): React.ReactNode {
    return (
      <ListingContainer>
        <ListingWrapper>
          <ListingForm onSubmit={this.updateListing}>
            <ListingImage src="https://via.placeholder.com/400x250" alt={this.state.title} />
            <ListingLabel>Title</ListingLabel>
            <ListingInput name='title' value={this.state.title} onChange={this.handleChange} />
            <ListingLabel>Description</ListingLabel>
            <ListingTextarea name='description' value={this.state.description} onChange={this.handleChange} />
            <ListingLabel>Price</ListingLabel>
            <ListingInput name='price' value={this.state.price} onChange={this.handleChange} />
            <ListingLabel>Tags</ListingLabel>
            <ListingInput name='tag' value={this.state.tag} onChange={this.handleChange} />
            <EditDelete type="submit">Save</EditDelete>
            <EditDelete>Delete</EditDelete>
          </ListingForm>    
        </ListingWrapper>
        {!this.props.listingEdit && <Navigate to={`/listing/${this.state.listingID}`} replace={true} />}
      </ListingContainer>
    )
  }
}

export default ListingEdit;