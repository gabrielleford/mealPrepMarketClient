import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppProps } from '../../App'

type Props = {
  listingEdit: AppProps['listingEdit'],
}

// ** Pickup/Delivery Input ** //
export const FulfillmentLabel = styled.label`
`

export const Fulfillment = styled.span`
`

export const FulfillmentInput = styled.input`

`



// ** Button Div ** //
export const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`