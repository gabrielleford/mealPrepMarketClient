import { Group } from "@mantine/core";
import React from "react";
import { IoClose } from 'react-icons/io5';
import { AppProps } from "../../App";
import Landing from "../landing/Landing";
import { Icon, SidebarContainer, CreateInput, TagLabel} from "./FilterElements";

type FilterProps = {
  filterOpen: AppProps['filterOpen'],
  handleTag: Landing['handleTag'],
  setFilterOpen: AppProps['setFilterOpen'],
}

class Filter extends React.Component<FilterProps> {
  constructor(props:FilterProps) {
    super(props)

    this.state = {
    }
  }

  render(): React.ReactNode {
    return (
      <SidebarContainer onClick={() => this.props.setFilterOpen(!this.props.filterOpen)} filterOpen={this.props.filterOpen}>
          <Icon>
            <IoClose />
          </Icon>
          <Group direction="column" position="center">
            <TagFilter handleTag={this.props.handleTag} />
          </Group>
      </SidebarContainer>
    )
  }
}

export default Filter;

type TagProps = {
  handleTag: FilterProps['handleTag'],
}

class TagFilter extends React.Component<TagProps> {
  render(): React.ReactNode {
    return (
      <>
      <CreateInput id='keto' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="keto">
        Keto
      </TagLabel>
      <CreateInput id='low-Carb' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="low-Carb">
        Low Carb
      </TagLabel>
      <CreateInput id='mediterranean' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="mediterranean">
        Mediterranean
      </TagLabel>
      <CreateInput id='paleo' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="paleo">
        Paleo
      </TagLabel>
      <CreateInput id='vegan' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="vegan">
        Vegan
      </TagLabel>
      <CreateInput id='vegetarian' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="vegetarian">
        Vegetarian
      </TagLabel>
      <CreateInput id='dairy-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="dairy-Free">
        Dairy Free
      </TagLabel>
      <CreateInput id='egg-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="egg-Free">
        Egg Free
      </TagLabel>
      <CreateInput id='gluten-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="gluten-Free">
        Gluten Free
      </TagLabel>
      <CreateInput id='nut-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="nut-Free">
        Nut Free
      </TagLabel>
      <CreateInput id='soy-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="soy-Free">
        Soy Free
      </TagLabel>
      <CreateInput id='sugar-Free' type='checkbox' onChange={this.props.handleTag}/>
      <TagLabel htmlFor="sugar-Free">
        Sugar Free
      </TagLabel>
      </>
    )
  }
}