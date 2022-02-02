import styled from "styled-components";
import { AppProps } from '../../App'

type Props = {
  listingEdit: AppProps['listingEdit'],
}

// ** Main Div ** //
export const ListingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2000px;
  height: 100vh;
  transition: all 0.3s ease-in-out;
`

// ** Wrapper ** //
export const ListingWrapper = styled.div`
  width: 35vw;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 20vh auto auto auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
`

// ** Listing Title ** //
export const IndivListingH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  color: #05386b;
  margin-top: -1vh;
  margin-bottom: -4vh;
`

// ** Listing Owner Div ** //
export const ListingUserDiv = styled.div`
  
`

// ** Prepped by ** //
export const PreppedBy = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #05386b;
`

// ** Listing Owner ** //
export const ListingUser = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #05386b;
  cursor: pointer;
`

// ** Listing Image ** //
export const IndivListingImg = styled.img`
  border-radius: ${(props:Props) => props.listingEdit ? '10px' : '10px 10px 0 0'};
  height: 250px;
  width: 400px;
  margin-top: ${(props:Props) => props.listingEdit ? '-3vh' : '4vh'};
`

// ** Listing Description ** //
export const IndivListingDescription = styled.p`
  background: #05386b;
  padding: 20px 35px;
  margin-top: -1vh;
  border-radius: 0 0 10px 10px;
  color: #edf5e1;
`

// ** Listing Price ** //
export const IndivListingPrice = styled.p`
  margin-top: -1vh;
  text-align: center;
`


// ** Listing Tag Container ** //
export const IndivListingTagContainer = styled.div`
  
`

// ** Listing Tags ** //
export const IndivListingTag = styled.img`
  
`

// ** Listing Form ** //
export const ListingForm = styled.form`
  margin-top: 8vh;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 2.5vh;
`

// ** Listing Label ** //
export const ListingLabel = styled.label`
  color: #05386b;
  margin-left: 6vw;
  margin-bottom: -2.5vh;
  margin-top: -1vh;
`

// ** Listing Input ** //
export const ListingInput = styled.input`
  width: 60%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  border: thin solid #05386b;
`

// ** Listing Textarea ** //
export const ListingTextarea = styled.textarea`
  font-family: 'Open Sans', sans-serif;
  width: 60%;
  max-width: 60%;
  /* max-height: 60%; */
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  border: thin solid #05386b;
`

// ** Quantity Selection ** //
export const QuantitySelect = styled.select`
  
`
// ** Quantity Options ** //
export const QuantityOption = styled.option`
  
`

// ** Pickup Button ** //
export const Pickup = styled.button`
  
`

// ** Delivery Button ** //
export const Delivery = styled.button`
  
`

// ** Submit order/Add to cart ** //
export const SubmitOrder = styled.button`
  
`

// ** Button Div ** //
export const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

// ** Edit/Delete Listing ** //
export const EditDelete = styled.button`
  width: 20%;
  color: #edf5e1;
  background: #05386b;
  margin-left: 1vw;
  margin-right: 1vw;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 2px 1px rgba(5, 56, 107, 0.4);
  font-size: 1.1rem;
  padding: 7.5px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
`