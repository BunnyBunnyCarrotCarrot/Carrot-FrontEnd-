import React from "react";
import styled from "styled-components";

const Grids = (props) => {
  //Border category
  const { B_left, B_right, Border, B_radius, B_bottom, B_top } = props;

  //box category
  const { box_shadow } = props;

  //Background category
  const { BG_c } = props;

  //flex category
  const {
    is_flex,
    flex_direction,
    flex_wrap,
    justify_content,
    align_items,
    gap,
  } = props;

  //size, position category
  const {
    width,
    height,
    margin,
    padding,
    position,
    transform,
    left,
    right,
    top,
    bottom,
    z_index,
    font_size,
    font_weight,
    color,
  } = props;

  //event category
  const { _onClick } = props;

  //children category
  const { children } = props;

  const styles = {
    B_left,
    B_right,
    B_bottom,
    B_top,
    B_radius,
    Border,

    box_shadow,

    BG_c,

    is_flex,
    flex_direction,
    justify_content,
    align_items,
    flex_wrap,
    gap,

    width,
    height,
    margin,
    padding,
    position,
    transform,
    left,
    right,
    top,
    bottom,
    z_index,
    font_size,
    font_weight,
    color,
  };

  return (
    <React.Fragment>
      <GridBox onClick={_onClick} {...styles}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

//default Props value
Grids.defaultProps = {
  children: null,

  is_flex: false,
  flex_direction: "row",
  flex_wrap: "wrap",
  align_items: "center",
  justify_content: null,
  gap: null,

  box_shadow: null,

  BG_c: false,

  Border: false,
  width: null,
  height: null,
  padding: false,
  margin: false,
  position: null,
  transform: null,
  left: null,
  right: null,
  top: null,
  bottom: null,
  z_index: null,
  font_size: null,
  font_weight: null,
  color: null,

  _onClick: null,
};

const GridBox = styled.div`
  //flex
  ${(props) => (props.is_flex ? `display : flex;` : "")}
  align-items: ${(props) => props.align_items};
  justify-content: ${(props) => props.justify_content};
  flex-direction: ${(props) => props.flex_direction};
  flex-wrap: ${(props) => props.flex_wrap};
  box-shadow: ${(props) => props.box_shadow};
  gap: ${(props) => props.gap};
  //size, position
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  transform: ${(props) => props.transform};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  z-index: ${(props) => props.z_index};
  & * {
    font-size: ${(props) => props.font_size};
    font-weight: ${(props) => props.font_weight};
    color: ${(props) => props.color};
  }
  //border
  border: ${(props) => props.Border};
  border-left: ${(props) => props.B_left};
  border-right: ${(props) => props.B_right};
  border-top: ${(props) => props.B_top};
  border-bottom: ${(props) => props.B_bottom};
  border-radius: ${(props) => props.B_radius};
  //background
  background-color: ${(props) => props.BG_c};
  box-sizing: border-box;
`;

export default Grids;