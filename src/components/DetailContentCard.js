import React from "react";
import { Grids, TextLabel } from "../elements/Index";

const DetailContentCard = (props) => {
  const { title, about, category, likeCount, viewCount } = props;
  return (
    <React.Fragment>
      <Grids
        B_bottom="1px solid rgba(0,0,0,0.1)"
        padding="20px 15px"
        is_flex
        flex_direction="column"
        align_items="flex-start"
        justify_content="space-between"
      >
        <Grids>
          <TextLabel F_weight="bold" F_size="25px">
            {title}
          </TextLabel>
        </Grids>
        <Grids margin="5px 0" color="#4D5159">
          <TextLabel>{category}</TextLabel>
        </Grids>
        <Grids margin="10px 0 30px 0">
          <TextLabel F_size="17px">{about}</TextLabel>
        </Grids>
        <Grids color="#4D5159">
          <TextLabel F_size="13px">
            관심 {likeCount} ∙ 조회 {viewCount}
          </TextLabel>
        </Grids>
      </Grids>
    </React.Fragment>
  );
};
export default DetailContentCard;