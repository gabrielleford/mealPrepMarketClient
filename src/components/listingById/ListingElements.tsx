import styled from "styled-components";
import { Link } from "react-router-dom";
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
  height: fit-content;
  transition: all 0.3s ease-in-out;
`

// ** Wrapper ** //
export const ListingWrapper = styled.div`
  width: 35%;
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 21vh auto auto auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1215px) {
    margin: 19vh auto auto auto;
    width: 45%;
  }

  @media screen and (max-width: 1032px) {
    margin: 16vh auto auto auto;
    width: 55%;
  }

  @media screen and (max-width: 768px) {
    margin: 13vh auto auto auto;
    width: 75%;
  }

  @media screen and (max-width: 480px) {
    margin: 13vh auto auto auto;
    width: 100%;
  }
`

// ** Listing Title ** //
export const IndivListingH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  color: #05386b;
  margin-top: -1vh;
  margin-bottom: -1.6rem;
`

// ** Listing Owner Div ** //
export const ListingUserDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -2rem;
`

// ** Prepped by ** //
export const PreppedBy = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #05386b;
  margin-right: 0.5vw;
  margin-top: 1.6rem;
`

// ** Listing Owner ** //
export const ListingUser = styled(Link)`
  font-weight: 300;
  text-align: center;
  text-decoration: underline;
  color: #05386b;
  margin-left: 0.7vw;
  margin-top: 1.64rem;
  cursor: pointer;
`

// ** Listing Image ** //
export const IndivListingImg = styled.img`
  border-radius: ${(props:Props) => props.listingEdit ? '10px' : '10px 10px 0 0'};
  max-width: 80%;
  margin: 0 auto;
  margin-top: ${(props:Props) => props.listingEdit ? '-3vh' : '4vh'};

  @media screen and (max-width: 480px) {
    max-width: 90%;
  }
`

// ** Listing Description ** //
export const IndivListingDescription = styled.p`
  background: #05386b;
  padding: 20px 35px;
  margin-top: -1vh;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0 0 10px 10px;
  color: #edf5e1;
  width: 80%;

  @media screen and (max-width: 480px) {
    width: 90%;
  }
`

// ** Listing Price ** //
export const IndivListingPrice = styled.p`
  color: #05386b;
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
  margin-left: 6.5rem;
  margin-right: auto;
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

// ** Get Started P ** //
export const Para = styled.p`
  color: #05386b;
  text-align: center;
  margin-top: -0.1rem;
  margin-bottom: 0.5rem;
`

export const GetStarted = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: #edf5e1;
  background: #05386b;
  font-size: 0.9rem;
  padding: 5px 10px;
  margin: 0 auto;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #05386b;
    background: #5cdb95;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
  }
`