import styled from "styled-components";

// ** Bottom Right Polygon ** //
export const Polygon = styled.img`
  max-width: 450px;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(40%, 40%);
  z-index: -3;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 400px;
    transform: translate(40%, 40%);
  }

  @media screen and (max-width: 1215px) {
    max-width: 350px;
    transform: translate(40%, 40%);
  }

  @media screen and (max-width: 1023px) {
    max-width: 300px;
    transform: translate(40%, 40%);
  }

  @media screen and (max-width: 768px) {
    max-width: 250px;
    transform: translate(40%, 40%);
  }

  @media screen and (max-width: 480px) {
    max-width: 200px;
    transform: translate(40%, 40%);
  }

  @media screen and (max-width: 330px) {
    max-width: 140px;
    transform: translate(40%, 40%);
  }
`

// ** Top Left Polygon ** //
export const Polygon2 = styled.img`
  max-width: 360px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-45%, 15%);
  z-index: -3;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 320px;
    transform: translate(-50%, 22%);
  }

  @media screen and (max-width: 1215px) {
    max-width: 290px;
    transform: translate(-45%, 21%);
  }

  @media screen and (max-width: 1023px) {
    max-width: 260px;
    transform: translate(-45%, 23%);
  }

  @media screen and (max-width: 768px) {
    max-width: 210px;
    transform: translate(-45%, 27%);
  }

  @media screen and (max-width: 480px) {
    max-width: 160px;
    transform: translate(-45%, 40%);
  }

  @media screen and (max-width: 330px) {
    max-width: 110px;
    transform: translate(-45%, 75%);
  }
`

// ** Bottom Left Star -- on top */
export const Star1 = styled.img`
  max-width: 250px;;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(27%, -52%);
  z-index: -2;
  transition: all 0.3s ease-in-out;
  
  @media screen and (max-width: 1407px) {
    max-width: 220px;
    transform: translate(27%, -53%);
  }

  @media screen and (max-width: 1215px) {
    max-width: 190px;
    transform: translate(27%, -54%);
  }

  @media screen and (max-width: 1023px) {
    max-width: 160px;
    transform: translate(27%, -56%);
  }

  @media screen and (max-width: 768px) {
    max-width: 130px;
    transform: translate(27%, -59%);
  }

  @media screen and (max-width: 480px) {
    max-width: 100px;
    transform: translate(27%, -63%);
  }

  @media screen and (max-width: 330px) {
    max-width: 70px;
    transform: translate(27%, -63%);
  }
`

// ** Bottom Right Star -- off to left ** //
export const Star2 = styled.img`
  max-width: 180px;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-170%, -5%);
  z-index: -2;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 160px;
  }

  @media screen and (max-width: 1215px) {
    max-width: 140px;
  }

  @media screen and (max-width: 1023px) {
    max-width: 120px;
  }

  @media screen and (max-width: 768px) {
    max-width: 100px;
  }

  @media screen and (max-width: 480px) {
    max-width: 80px;
  }

  @media screen and (max-width: 330px) {
    display: none;
  }
`

// ** Bottom Left Star ** //
export const Star3 = styled.img`
  max-width: 110px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-17%, -90%);
  z-index: -2;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 100px;
  }

  @media screen and (max-width: 1215px) {
    max-width: 90px;
  }

  @media screen and (max-width: 1023px) {
    max-width: 80px;
  }

  @media screen and (max-width: 768px) {
    max-width: 70px;
  }

  @media screen and (max-width: 480px) {
    max-width: 60px;
  }
`

// ** Top Left Star ** //
export const Star4 = styled.img`
  max-width: 160px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(68%, 80%);
  z-index: -2;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 140px;
    transform: translate(60%, 95%);
  }

  @media screen and (max-width: 1215px) {
    max-width: 120px;
    transform: translate(77%, 107%);
  }

  @media screen and (max-width: 1023px) {
    max-width: 100px;
    transform: translate(87%, 120%);
  }

  @media screen and (max-width: 768px) {
    max-width: 80px;
    transform: translate(90%, 131%);
  }

  @media screen and (max-width: 480px) {
    max-width: 60px;
    transform: translate(91%, 170%);
  }

  @media screen and (max-width: 330px) {
    max-width: 40px;
    transform: translate(97%, 272%);
  }
`

// ** Ramen ** //
export const Icon1 = styled.img`
  max-width: 220px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-10%, 10%);
  z-index: -1;
  transition: all 0.3s ease-in-out;
  
  @media screen and (max-width: 1407px) {
    max-width: 200px;
  }

  @media screen and (max-width: 1215px) {
    max-width: 180px;
  }

  @media screen and (max-width: 1023px) {
    max-width: 160px;
  }

  @media screen and (max-width: 768px) {
    max-width: 140px;
  }

  @media screen and (max-width: 480px) {
    max-width: 120px;
  }

  @media screen and (max-width: 330px) {
    max-width: 100px;
  }
`

// ** Bread Bowl ** //
export const Icon2 = styled.img`
  max-width: 200px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(3%, 75%);
  z-index: -1;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1407px) {
    max-width: 180px;
    transform: translate(3%, 85%);
  }

  @media screen and (max-width: 1215px) {
    max-width: 160px;
    transform: translate(3%, 88%);
  }

  @media screen and (max-width: 1032px) {
    max-width: 140px;
    transform: translate(3%, 90%);
  }

  @media screen and (max-width: 768px) {
    max-width: 120px;
    transform: translate(3%, 92%);
  }

  @media screen and (max-width: 480px) {
    max-width: 100px;
    transform: translate(3%, 105%);
  }
`