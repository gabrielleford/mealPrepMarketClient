import React from "react";
import { AppProps } from "../../App";
import { SidebarContainer } from "./SidebarElements";

type SidebarProps = {
  isOpen: AppProps['isOpen'],
  setIsOpen: AppProps['setIsOpen'],
}

class Sidebar extends React.Component<SidebarProps> {
  render(): React.ReactNode {
    return (
      <SidebarContainer onClick={() => this.props.setIsOpen(!this.props.isOpen)} isOpen={this.props.isOpen}>

      </SidebarContainer>
    )
  }
}

export default Sidebar;