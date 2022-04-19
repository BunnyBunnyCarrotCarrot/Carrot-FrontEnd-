import React from "react";
import { Grids, TextLabel, Image } from "../elements/Index";
import Rate from "../components/Rate";

const DetailUserCard = (props) => {
  const { user } = props;

  console.log(user);
  return (
    <Grids
      B_bottom="1px solid rgba(0,0,0,0.1)"
      padding="20px 15px"
      is_flex
      justify_content="space-between"
    >
      <Grids is_flex gap="10px">
        <Grids>
          <Image shape="circle" size="45" src={user.profileImage} />
        </Grids>
        <Grids
          is_flex
          flex_direction="column"
          align_items="flex-start"
          gap="5px"
        >
          <TextLabel F_weight="bold">{user.nickname}</TextLabel>
          <TextLabel>{user.address}</TextLabel>
        </Grids>
      </Grids>
      <Grids>
        <Rate rate={user.rate} />
      </Grids>
    </Grids>
  );
};

export default DetailUserCard;