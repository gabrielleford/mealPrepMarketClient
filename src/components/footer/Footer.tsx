import { Container } from "@mantine/core";
import React from "react";
import { Banner } from "./FooterElements";

export default class Footer extends React.Component {
  render(): React.ReactNode {
    return (
      <Container mt={300}>
        <Banner>
          <h3 id="footerText">© <a id='footerLink' href="https://gabrielleford.dev/">Gabrielle Ford</a> 2022</h3>
        </Banner>
      </Container>
    )
  }
}