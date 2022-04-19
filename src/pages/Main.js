import React from "react";
import MainCard from "../components/MainCard";
import { Grids, TextLabel, Button } from "../elements/Index";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import {
  IoOptionsOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
// import { postActions } from "../redux/modules/Post";

const Main = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState();
  console.log(props)
//   const postList = useSelector((state) => state.post.list);
//   console.log(postList);
  
//   React.useEffect(() => {
//     dispatch(postActions.loadPostDB());
//   }, []);

  return (
    <React.Fragment>
      <Header />
      <Grids
        position="sticky"
        top="56px"
        padding="10px"
        B_bottom="1px solid rgba(0,0,0,0.07)"
        BG_c="white"
        z_index="3"
      >
        <Grids is_flex justify_content="space-between" font_size="15px">
          <Grids is_flex gap="5px">
            <Grids font_size="23px" is_flex>
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
        {/* {postList.map((el, i) => {
          return <MainCard {...el} key={i} />;
        })} */}
      </Grids>
      <EditButton onClick={() => history.push("/post")}> +</EditButton>
      <Footer />
    </React.Fragment>
  );
};

const EditAnimation = keyframes`
  100%{
    transform: rotate(90deg);
  }
`;

const EditButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 40px;
  border: 0;
  background-color: #ff7e36;
  font-size: 50px;
  color: white;
  position: fixed;
  bottom: 90px;
  right: 20px;
  & :hover {
    animation: ${EditAnimation} 0.2s;
  }
`;

Main.defaultProps = {};

export default Main;