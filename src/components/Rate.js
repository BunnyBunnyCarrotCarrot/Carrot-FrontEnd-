import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import TextLabel from "../elements/TextLabel";
import bad from "../images/rate/bad.png";
import good from "../images/rate/good.png";
import veryGood from "../images/rate/veryGood.png";
import excellent from "../images/rate/excellent.png";

const Rate = (props) => {
  const { rate } = props;
  const [color, setColor] = React.useState("#1561a9");
  const [img, setImg] = React.useState(bad);
  const [active, setActive] = React.useState(false);

  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    if (rate < 36) {
      setColor("#1561a9");
      setImg(bad);
    } else if (rate < 40) {
      setColor("#319e45");
      setImg(good);
    } else if (rate < 50) {
      setColor("#df9100");
      setImg(veryGood);
    } else {
      setColor("#de5d06");
      setImg(excellent);
    }
  });

  return (
    <React.Fragment>
      <Grid is_flex flex_direction="column" align_items="flex-end" gap="5px">
        <Grid is_flex gap="10px">
          <Grid
            is_flex
            flex_direction="column"
            align_items="flex-end"
            gap="2px"
          >
            <Grid>
              <TextLabel F_color={color} F_size="17px">
                {rate}°C
              </TextLabel>
            </Grid>
            <Grid
              BG_c="rgba(0,0,0,0.1)"
              width="50px"
              height="5px"
              B_radius="3px"
            >
              <Grid
                width={rate + "%"}
                BG_c={color}
                height="5px"
                B_radius="6px"
              />
            </Grid>
          </Grid>

          <Grid>
            <img src={img} />
          </Grid>
        </Grid>
        <Grid position="relative">
          <Grid
            _onClick={() => {
              setActive(!active);
            }}
          >
            <TextLabel F_decoration="underline" F_color="#4D5159">
              매너온도
            </TextLabel>
          </Grid>
          <Grid position="absolute" right="0" bottom="-105px">
            <Balloon ref={dropdownRef} isActive={active}>
              <TextLabel F_color="white" F_weight="600">
                매너온도는 당근마켓
                <br />
                사용자로부터 받은 칭찬, 후기,
                <br />
                비매너 평가, 운영자 징계 등을
                <br />
                종합해서 만든 매너 지표입니다.
              </TextLabel>
            </Balloon>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Rate.defaultProps = {};

const Balloon = styled.div`
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};
  position: relative;
  width: 180px;
  padding: 10px;
  background: #ff7e36;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  ::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 10px 14px;
    border-color: #ff7e36 transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -7px;
    left: 165px;
  }
`;

export default Rate;