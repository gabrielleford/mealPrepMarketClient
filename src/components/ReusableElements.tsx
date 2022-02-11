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
  width: 300px;
  min-height: 200px;
  padding: 2% 0 3% 0;
  background: #edf5e1;
  border-radius: 2%;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
`

export const ListingH1 = styled.h1`
  color: #05386b;
  font-weight: 400;
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
  color: #05386b;

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

export const RouteLink = styled.a`
  text-decoration: none;
`

// ** Choose Image Button ** //
export const ImageUploadDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const FileName = styled.p`
  color: #05386b;
`
export const ImageUpload = styled.label`
  cursor: pointer;
  display: block;
  margin: 0 auto;
  width: fit-content;
  padding: 5px 7px;
  font-size: 0.8rem;
  border-radius: 10px;
  color: #05386b;
  background: #5cdb95;
  box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #8ee4af;
    box-shadow: 0 0 2px 1px rgba(92, 219, 149, 0.4);
  }
`

export const ImageInput = styled.input`
  display: none;
`