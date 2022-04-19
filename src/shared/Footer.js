import React, { useEffect } from "react";
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { Grids, TextLabel } from "../elements/Index";
import { IoChatbubblesOutline, IoChatbubblesSharp } from "react-icons/io5";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { IoNewspaperOutline, IoNewspaperSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { history } from "../redux/configStore";
import styled, { keyframes } from "styled-components";

const Footer = (props) => {
  return (
    <React.Fragment>
      <Grids
        is_flex
        justify_content="space-around"
        position="fixed"
        bottom="0"
        font_size="30px"
        BG_c="white"
        width="100%"
        height="70px"
        B_top="1px solid rgba(0,0,0,0.07)"
      >
        <Grids
          _onClick={() => {
            history.push("/main");
          }}
          is_flex
          flex_direction="column"
        >
          <RiHomeLine />
          <TextLabel>홈</TextLabel>
        </Grids>
        <Grids is_flex flex_direction="column">
          <IoNewspaperOutline />
          <TextLabel>나의상품</TextLabel>
        </Grids>
        <Grids is_flex flex_direction="column">
          <IoChatbubblesOutline />
          <TextLabel>채팅</TextLabel>
        </Grids>
        <Grids
          _onClick={() => {
            history.push("/mypage");
          }}
          is_flex
          flex_direction="column"
        >
          <IoPersonOutline />
          <TextLabel>나의 당근</TextLabel>
        </Grids>
        <Grids is_flex flex_direction="column">
          <IoLogOutOutline />
          <TextLabel>로그아웃</TextLabel>
        </Grids>
      </Grids>
    </React.Fragment>
  );
};

export default Footer;