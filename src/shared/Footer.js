import React, { useEffect } from "react";
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { Grids, TextLabel, Button } from "../elements/Index";
import { IoChatbubblesOutline, IoChatbubblesSharp } from "react-icons/io5";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { IoNewspaperOutline, IoNewspaperSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { history } from "../redux/configStore";
import { userActions } from "../redux/modules/User";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";

const Footer = (props) => {
  const dispatch = useDispatch();
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
      <Button _onClick={()=> {
            history.push("/main");
          }} Border="none" BG_color="white">
        <Grids
          is_flex
          flex_direction="column">
          <RiHomeLine />
          <TextLabel>홈</TextLabel>
        </Grids>
      </Button>

      <Button _onClick={()=> console.log("버튼")} Border="none" BG_color="white">
        <Grids is_flex flex_direction="column">
          <IoNewspaperOutline />
          <TextLabel>나의상품</TextLabel>
        </Grids>
        </Button>

      <Button _onClick={()=> console.log("버튼")} Border="none" BG_color="white">
        <Grids is_flex flex_direction="column">
          <IoChatbubblesOutline />
          <TextLabel>채팅</TextLabel>
        </Grids>
      </Button>

      <Button _onClick={()=> {
            history.push("/mypage");
          }} Border="none" BG_color="white">
        <Grids is_flex flex_direction="column">
          <IoPersonOutline />
          <TextLabel>나의 당근</TextLabel>
        </Grids>
      </Button>


        <Button _onClick={()=> dispatch(userActions.logOutDB())} Border="none" BG_color="white">
          <Grids is_flex flex_direction="column">
            <IoLogOutOutline />
            <TextLabel>로그아웃</TextLabel>
          </Grids>
        </Button>
      </Grids>
    </React.Fragment>
  );
};

export default Footer;