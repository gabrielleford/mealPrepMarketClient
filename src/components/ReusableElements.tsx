import styled from "styled-components";

export const ListingCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-evenly;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 2rem;

  @media screen and (min-width: 1216px) and (max-width: 1407px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1033px) and (max-width: 1215px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 769px) and (max-width: 1032px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: px) and (max-width: 768px) {
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
  margin: 0 auto;
`

export const ListingH1 = styled.h1`
  font-size: 1.4rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.85rem;
  }
`

export const ListingImg = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: 15rem;
  object-fit: cover;
`

export const ListingPrice = styled.p`
  

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 280px) {
    font-size: 0.8rem;
  }
`

export const ListingTagContainer = styled.div`
  
`

export const ListingTag = styled.img`
  
`