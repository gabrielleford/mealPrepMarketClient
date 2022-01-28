import React from "react";
import { AppProps } from "../../App";
import { ListingState } from "../listingById/ListingById";
import { ButtonDiv } from "../listingById/ListingElements";
import { CancelButton, ConfirmDeleteDiv, DeleteButton, DeleteContainer, DeleteH1, DeleteP, Gif} from "./DeleteElements";

type GifState = {
  number: number,
  randGifs: string[],
  gif: string,
  endpoint: string,
  _isMounted: boolean,
}

type DeleteProps = {
  what: AppProps['what'],
  listingID: ListingState['listingID'],
  confirmDelete: ListingState['confirmDelete'],
}

class ConfirmDelete extends React.Component<DeleteProps, GifState> {
  constructor(props: DeleteProps) {
    super(props)

    this.state = {
      number: 0,
      randGifs: ['', 'https://media.giphy.com/media/uUFuppAa2AU7mfQFoo/giphy-downsized-large.gif', 'https://media.giphy.com/media/nltL8wnwoOYyPI6VPu/giphy.gif', 'https://media.giphy.com/media/3ohzAKkcyuLEIiI9Wg/giphy.gif', 'https://media.giphy.com/media/Qvq2680UHZ7vgxUeDh/giphy-downsized-large.gif', 'https://media.giphy.com/media/2KVfyCSkwyh4IWNHHk/giphy.gif', 'https://media.giphy.com/media/qJPM6zdMAL39wLoKJx/giphy.gif', 'https://media.giphy.com/media/1swY7LHRqVwzivnvgI/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif', 'https://media.giphy.com/media/h45zAKT2Np2ZS5tHvk/giphy.gif'],
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
      number: Math.floor(Math.random() * this.state.randGifs.length)
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
          endpoint: `/listing/${this.props.listingID}`
        });
        break;
      case 'user':
        this.setState({

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
  }

  componentDidUpdate(prevProps:Readonly<DeleteProps>, prevState:Readonly<GifState>) {
    if (this.state.number !== prevState.number)
    this.setGif(this.state.number);
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });
    this.grabGif();
    this.setWhat();
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });
  }

  render(): React.ReactNode {
    console.log(this.state.number)
    return (
      <DeleteContainer>
        <ConfirmDeleteDiv>
          <DeleteH1>Are you sure?</DeleteH1>
            <Gif src={this.state.gif} alt='Gif' />
          <DeleteP>This is <strong>irreversible</strong>.</DeleteP>
          <ButtonDiv>
            <DeleteButton onClick={this.delete}>Yes</DeleteButton>
            <CancelButton onClick={this.props.confirmDelete}>Cancel</CancelButton>
          </ButtonDiv>
        </ConfirmDeleteDiv>
      </DeleteContainer>
    )
  }
}

export default ConfirmDelete;