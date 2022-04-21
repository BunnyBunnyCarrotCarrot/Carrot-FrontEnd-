import React from "react";
import test from "../images/test.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { Grids } from "../elements/Index";

const DetailSlider = (props) => {
  const { images } = props;
  const image = [test];

  const style = {
    showArrows: false,
    showThumbs: false,
    showStatus: false,
    showIndicators: false,
  };
  return (
    <React.Fragment>
      <Carousel {...style}>
         {image.map((el, i) => {
          return <AspectInner src={el} key={i} />;
        })}
    </Carousel>
    </React.Fragment>
  );
};

DetailSlider.defaultProps = {
  image: [],
};

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default DetailSlider;