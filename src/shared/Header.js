import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import styled from "styled-components";
import { Grids, Text, Button } from "../elements/Index";
import { history } from "../redux/configStore";

const Header = (props) => {
  const { title, _dis, _onClick } = props;

  const f_c = _dis ? '#000':'#FF7E36';
  if(title === 'post'){
    return (
      <Grids
      padding="15px"
      width="100%"
      height="56px"
      is_flex
      justify_content='space-between'
      gap="15px"
      B_bottom="1px solid rgba(0,0,0,0.07)"
      position="sticky"
      top="0"
      BG_c="white"
      z_index="3"
    >
      <Grids is_flex>
        <Text
          _onClick={() => history.goBack()}
          width="auto"
          F_size="25px"
          is_flex
        >
          <IoArrowBackOutline />
        </Text>
        <Text width="auto" F_size="18px" F_weight="bold">
          중고거래 글쓰기
        </Text>
      </Grids>

      <Grids>
        <Button 
        _onClick={_onClick}
        Border='none'
        BG_color='#fff'
        font_color={f_c}
        disabled={_dis} 
        >완료</Button>
      </Grids>
    </Grids>
    )
  }

  return (
    <Grids
      padding="15px"
      width="100%"
      height="56px"
      is_flex
      gap="15px"
      B_bottom="1px solid rgba(0,0,0,0.07)"
      position="sticky"
      top="0"
      BG_c="white"
      z_index="3"
    >
      <Text
        _onClick={() => history.goBack()}
        width="auto"
        F_size="25px"
        is_flex
      >
        <IoArrowBackOutline />
      </Text>
      <Text width="auto" F_size="18px" F_weight="bold">
        {title}
      </Text>
    </Grids>
  );
};

Header.defaultProps = {
  title: null,
  _dis:true,
  _onClick: ()=>{},
};

export default Header;