import React from "react";
import { Grid, TextLabel, Button } from "../elements/Index";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const DetailFooter = (props) => {
  const { price, postId } = props;

  const [state, setState] = React.useState(false);

  return (
    <React.Fragment>
      <Grid
        BG_c="white"
        width="100%"
        position="fixed"
        bottom="0"
        padding="15px"
        is_flex
        justify_content="space-between"
        B_top="1px solid rgba(0,0,0,0.1)"
      >
        <Grid is_flex>
          <Grid
            font_size="25px"
            padding="0 10px"
            B_right="1px solid rgba(0,0,0,0.1)"
            _onClick={() => setState(!state)}
            color={state ? "red" : ""}
          >
            {state ? <IoHeart /> : <IoHeartOutline />}
          </Grid>
          <Grid
            padding="0 10px"
            is_flex
            flex_direction="column"
            gap="5px"
            align_items="flex-start"
          >
            <Grid>
              <TextLabel F_size="18px" F_weight="bold">
                {price}원
              </TextLabel>
            </Grid>
            <Grid>
              <TextLabel F_color="#FF7E36" F_decoration="underline">
                가격 제안하기
              </TextLabel>
            </Grid>
          </Grid>
        </Grid>
        <Grid color="white">
          <Button
            BG_color="#FF7E36"
            Border="0"
            B_radius="5px"
            padding="8px 12px"
          >
            <TextLabel F_weight="600" F_size="16px">
              채팅으로 거래하기
            </TextLabel>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

DetailFooter.defaultProps = {};

export default DetailFooter;