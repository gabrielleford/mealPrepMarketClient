import styled from "styled-components";

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
  margin: 23vh auto auto auto;
  border-radius: 7px;
  padding: 30px 0 20px 0px;
  background: #edf5e1;
`

// ** Listing Title ** //
export const ListingH1 = styled.h1`
  font-weight: 400;
  text-align: center;
  color: #05386b;
  margin-top: -1vh;
  margin-bottom: -4vh;
`

// ** Listing Owner ** //
export const ListingUser = styled.h4`
  font-weight: 300;
  text-align: center;
  color: #05386b;
`

// ** Listing Image ** //
export const ListingImage = styled.img`
  border-radius: 10px 10px 0 0;
  height: 250px;
  width: 400px;
  margin-top: -3vh;
`

// ** Listing Description ** //
export const ListingDescription = styled.p`
  background: #05386b;
  padding: 20px 35px;
  margin-top: -1vh;
  border-radius: 0 0 10px 10px;
  color: #edf5e1;
`

// ** Listing Price ** //
export const ListingPrice = styled.p`
  margin-top: -1vh;
`


// ** Listing Tag Container ** //
export const ListingTagContainer = styled.div`
  
`

// ** Listing Tags ** //
export const ListingTag = styled.img`
  
`

// ** Listing Form ** //
export const ListingForm = styled.form`
  display: grid;
  justify-content: center;
  grid-gap: 2.5vh;
`

// ** Listing Label ** //
export const ListingLabel = styled.label`
  
`

// ** Listing Input ** //
export const ListingInput = styled.input`
  
`

// ** Listing Textarea ** //
export const ListingTextarea = styled.textarea`
  font-family: 'Open Sans', sans-serif;
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

// ** Edit/Delete Listing ** //
export const EditDelete = styled.button`
  width: 80%;
  margin: -0.5vh auto 0 auto;
  color: #edf5e1;
  background: #05386b;
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