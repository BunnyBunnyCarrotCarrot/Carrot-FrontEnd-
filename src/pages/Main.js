import React, {useEffect, useState} from "react";

import MainCard from "../components/MainCard";
import { Grids, TextLabel, Button } from "../elements/Index";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

import styled, { keyframes } from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { ItemActions } from "../redux/modules/Itemredux";

import {
  IoOptionsOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

const Main = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(true);
  const itemList = useSelector((state) => state.item.list);
   console.log(itemList);


  React.useEffect(() => {
    dispatch(ItemActions.loaditemDB());
  }, []);
 
  
  
  return (
    <>
    <React.Fragment>
      <Header />
      <Grids  position="sticky" top="56px" padding="10px"
        B_bottom="1px solid rgba(0,0,0,0.07)" BG_c="white" z_index="3">
        <Grids is_flex justify_content="space-between" font_size="15px">
          <Grids is_flex gap="5px">
            <Grids  font_size="23px" is_flex>
              <IoOptionsOutline />
            </Grids>
            <TextLabel F_weight="bold">검색 필더</TextLabel>
          </Grids>
          <Grids is_flex gap="5px">
            <Grids
              font_size="23px"
              color={state ? "rgba(0,0,0,0.5)" : "#FF7E36"}
              is_flex
              _onClick={() => setState(!state)}
            >
              {state ? (
                <IoCheckmarkCircleOutline />
              ) : (
                <IoCheckmarkCircleSharp />
              )}
            </Grids>
            <TextLabel>거래 완료 안보기</TextLabel>
          </Grids>
        </Grids>

        </Grids>
        <Grids>
          {itemList&&itemList.map((p, idx)=>{
            return <MainCard {...p} key={p.id}/>;
          })}
      </Grids>
      <ItemButton onClick={()=> history.push("/Item")}>+</ItemButton>
      <Footer />
    </React.Fragment>
    </>
  );
};

const EditAnimation = keyframes`
  100%{
    transform: rotate(90deg);
  }
`;

const ItemButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #ff7e36;
  color: white;
  box-sizing: border-box;
  font-size: 45px;
  font-weight: 600;
  position: fixed;
  bottom: 100px;
  right: 30px;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  & :hover {
    animation: ${EditAnimation} 0.2s;
  }
`;

export default Main;