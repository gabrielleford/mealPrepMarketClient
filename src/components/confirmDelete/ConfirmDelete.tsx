import React from "react";
import APIURL from "../helpers/environments";
import { Navigate } from "react-router-dom";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { ButtonDiv } from "../listingById/ListingElements";
import { CancelButton, ConfirmDeleteDiv, DeleteButton, DeleteContainer, DeleteH1, DeleteP, Gif} from "./DeleteElements";

type GifState = {
  number: number,
  max: number,
  min: number,
  randGifs: string[],
  gif: string,
  endpoint: string,
  _isMounted: boolean,
}

type DeleteProps = {
  listingID: ListingState['listingID'],
  user: AppProps['user'],
  sessionToken: AppProps['sessionToken'],
  what: AppProps['what'],
  dlt: AppProps['dlt'],
  response: AppProps['response'],
  setDelete: AppProps['setDelete'],
  clearToken: AppProps['clearToken'],
  setResponse: AppProps['setResponse'],
}

class ConfirmDelete extends React.Component<DeleteProps, GifState> {
  constructor(props: DeleteProps) {
    super(props)

    this.state = {
      number: 0,
      max: 14,
      min: 1,
      randGifs: ['', 'https://media.giphy.com/media/uUFuppAa2AU7mfQFoo/giphy-downsized-large.gif', 'https://media.giphy.com/media/nltL8wnwoOYyPI6VPu/giphy.gif', 'https://media.giphy.com/media/3ohzAKkcyuLEIiI9Wg/giphy.gif', 'https://media.giphy.com/media/Qvq2680UHZ7vgxUeDh/giphy-downsized-large.gif', 'https://media.giphy.com/media/2KVfyCSkwyh4IWNHHk/giphy.gif', 'https://media.giphy.com/media/qJPM6zdMAL39wLoKJx/giphy.gif', 'https://media.giphy.com/media/1swY7LHRqVwzivnvgI/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/pICj6JWqVpm5aapOIS/giphy.gif', 'https://media.giphy.com/media/8vR5eRDdPYHQq4n7jh/giphy.gif', 'https://media.giphy.com/media/26tn0dQX4oeqrhZni/giphy.gif', 'https://media.giphy.com/media/5b5OU7aUekfdSAER5I/giphy.gif', 'https://media.giphy.com/media/28I5KEqbxUEafaeNtV/giphy.gif', 'https://media.giphy.com/media/nqHj2YRYma2m2fRKrY/giphy.gif'],
      gif: '',
      endpoint: '',
      _isMounted: false,
    }

    this.grabGif = this.grabGif.bind(this);
    this.setGif = this.setGif.bind(this);
    this.setWhat = this.setWhat.bind(this);
    this.delete = this.delete.bind(this);
  }

  grabGif = ():void => {
    this.setState({
      number: Math.floor(Math.random() * (this.state.max - this.state.min + 1) + this.state.min)
    })
  }

  setGif = (num:number):void => {
    this.setState({
      gif: this.state.randGifs[num]
    })
  }

  setWhat = ():void => {
    switch(this.props.what) {
      case 'listing':
        this.setState({
          endpoint: `/listing/delete/${this.props.listingID}`
        });
        break;
      case 'user':
        this.setState({
          endpoint: `/user/delete/${this.props.user.userId}`
        })
        break;
      case 'order':
        this.setState({

        })
        break;
    }
  }

  delete = async ():Promise<void> => {
    console.log(`${this.props.what} deleted`);
    await fetch(`${APIURL}${this.state.endpoint}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.props.sessionToken}`
      })
    })
    .then(res => {
      this.props.setResponse(res.status);
      return res.json();
    })
    .then(res => {
      console.log(res);
      if (this.props.what === 'user') {
        this.state._isMounted && this.props.clearToken();
      }
    })
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
    this.grabGif();
    this.setWhat();
  }

  componentDidUpdate(prevProps:Readonly<DeleteProps>, prevState:Readonly<GifState>) {
    if (this.state.number !== prevState.number)
    this.setGif(this.state.number);
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
    this.props.setDelete(false);
  }

  render(): React.ReactNode {
    return (
      <DeleteContainer onClick={() => this.props.setDelete(false)}>
        <ConfirmDeleteDiv>
          <DeleteH1>Are you sure?</DeleteH1>
            <Gif src={this.state.gif} alt='Gif' />
          <DeleteP>This is <strong>irreversible</strong>.</DeleteP>
          <ButtonDiv>
            <DeleteButton onClick={this.delete}>Delete</DeleteButton>
            <CancelButton onClick={() => this.props.setDelete(false)}>Cancel</CancelButton>
          </ButtonDiv>
        </ConfirmDeleteDiv>
        {this.props.response === 200 ?
        <Navigate to='/' replace={true} /> :
        !localStorage.getItem('Authorization') ?
        <Navigate to='/' replace={true} /> : ''
        }
      </DeleteContainer>
    )
  }
}

export default ConfirmDelete;