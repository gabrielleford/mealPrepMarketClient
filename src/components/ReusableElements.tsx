import styled from "styled-components";

export const ListingCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 2rem;

  @media screen and (min-width: 769px) and (max-width: 1032px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const ListingCard = styled.div`
  max-width: 300px;
  min-height: 200px;
  padding: 2% 0 3% 0;
  background: #edf5e1;
  border-radius: 2%;
  text-align: center;
`

export const ListingH1 = styled.h1`
  font-size: 1.4rem;
`

export const ListingImg = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 300px;
  max-height: 200px;
`

export const ListingPrice = styled.p`
  
`

export const ListingTagContainer = styled.div`
  
`

export const ListingTag = styled.img`
  
`