import React from "react";
import styled from "styled-components";

const TextLabel = (props) => {
  const { F_size, F_color, F_weight, F_style, F_decoration, F_align } = props;

  const { margin, padding, width } = props;

  const { _onClick, children } = props;
  const styles = {
    F_size,
    F_color,
    F_weight,
    F_style,
    F_decoration,
    F_align,

    margin,
    padding,
    width,
  };

  return (
    <P onClick={_onClick} {...styles}>
      {children}
    </P>
  );
};

TextLabel.defaultProps = {
  F_size: "14px",
  F_color: null,
  F_weight: false,
  F_style: null,
  F_decoration: null,
  F_align: null,

  margin: null,
  padding: null,
  width: null,

  _onClick: null,
};

const P = styled.label`
  font-size: ${(props) => props.F_size};
  color: ${(props) => props.F_color};
  font-weight: ${(props) => props.F_weight};
  font-style: ${(props) => props.F_style};
  text-decoration: ${(props) => props.F_decoration};
  text-align: ${(props) => props.F_align};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
`;

export default TextLabel;