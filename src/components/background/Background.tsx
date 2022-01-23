import React from "react";
import { Icon1, Icon2, Polygon, Polygon2, Star1, Star2, Star3, Star4 } from './BackgroundElements';
import mealPrepMarketPolygon from './images/mealPrepMarketPolygon.png';
import mealPrepMarketStar1 from './images/mealPrepMarketStar1.png';
import mealPrepMarketStar2 from './images/mealPrepMarketStar2.png';
import mealPrepMarketIcon from './images/mealPrepMarketIcon.png';
import mealPrepMarketStar3 from './images/mealPrepMarketStar3.png';
import mealPrepMarketStar4 from './images/mealPrepMarketStar4.png';
import mealPrepMarketIcon2 from './images/mealPrepMarketIcon2.png';

class Background extends React.Component {
  render(): React.ReactNode {
      return (
        <>
        <Polygon src={mealPrepMarketPolygon} />
        <Polygon2 src={mealPrepMarketPolygon} />
        <Star1 src={mealPrepMarketStar1} />
        <Star2 src={mealPrepMarketStar2} />
        <Icon1 src={mealPrepMarketIcon} />
        <Star3 src={mealPrepMarketStar3} />
        <Star4 src={mealPrepMarketStar4} />
        <Icon2 src={mealPrepMarketIcon2} />
      </>
      )
  }
}

export default Background;