import React from "react";
import { AppProps } from "../../App";
import {  } from './LandingElements'

export type LandingProps = {
  sessionToken: AppProps['sessionToken'],
  isLoggedIn: AppProps['isLoggedIn'],
  fetchData: AppProps['fetchData']
}

class Landing extends React.Component<LandingProps> {

  render(): React.ReactNode {
      return (
        <>
          <h1>Heading</h1>
        </>
      )
  }
}

export default Landing;