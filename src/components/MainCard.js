import React from "react";
import styled from "styled-components";
import { Grids, TextLabel } from "../elements/Index";
// import test from "../images/test.jpeg";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import ReactModal from "react-modal";
import "../shared/App.css";
import { useDispatch } from "react-redux";
// import { postActions } from "../redux/modules/Post";
import { history } from "../redux/configStore";

const MainCard = (props) => {
  const dispatch = useDispatch();

  const { page, user, postId, title, price, likeCnt, state } = props;
  const image = [test];

  const [ModalState, setModalState] = React.useState(false);
  const [likeState, setLikeState] = React.useState(false);

  const likeChange = () => {
    setLikeState(!likeState);
  };

  const delPost = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // dispatch(postActions.delPostDB(postId));
    }
  };

  // const postStateSet = () => {
  //   dispatch(postActions.postStateSetDB(postId, state));
  //   setModalState(false);
  // };

  return (
    <React.Fragment>
      <Grids
        B_bottom="1px solid rgba(0,0,0,0.07)"
        padding="15px"
        gap="15px"
        is_flex
        align_items="flex-start"
        position="relative"
      >
        <Grids width="30%" _onClick={() => history.push("/detail/" + postId)}>
          <AspectInner src={image[0]} />
        </Grids>
        <Grids
          is_flex
          flex_direction="column"
          align_items="flex-start"
          gap="5px"
          width="60%"
        >
          <TextLabel F_size="17px" F_weight="bold">
            {title}
          </TextLabel>
          <TextLabel F_color="#4D5159">{user.address}</TextLabel>
          <Grids is_flex gap="10px">
            {state && (
              <Grids
                width="auto"
                BG_c="rgba(0,0,0,0.6)"
                padding="1px 10px 3px 10px"
                B_radius="3px"
              >
                <TextLabel F_weight="bold" F_color="white" F_size="12px">
                  거래완료
                </TextLabel>
              </Grids>
            )}
            <TextLabel F_weight="bold">{price}원</TextLabel>
          </Grids>
        </Grids>
        <Grids position="absolute" right="10px" bottom="10px" is_flex gap="5px">
          <IoHeartOutline />
          <TextLabel>{likeCnt}</TextLabel>
        </Grids>

        <Grids position="absolute" top="15px" right="10px">
          {page === "like" ? (
            <Grids
              font_size="23px"
              _onClick={() => {
                likeChange();
              }}
              color={likeState ? "#ff7e36" : "#4D5159"}
            >
              {likeState ? <IoHeart /> : <IoHeartOutline />}
            </Grids>
          ) : (
            <Grids
              _onClick={() => {
                setModalState(true);
              }}
            >
              <IoEllipsisVertical />
            </Grids>
          )}
        </Grids>
      </Grids>

      {/* 수정 모달 & 좋아요 기능 */}
      <ReactModal
        state={ModalState}
        isOpen={ModalState}
        ariaHideApp={false}
        onRequestClose={() => setModalState(false)}
        closeTimeoutMS={200}
        style={{
          overlay: {
            zIndex: 3,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          content: {
            borderRadius: 0,
            top: "calc(100% - 200px)",
            height: "200px",
            width: "100%",
            left: 0,
            padding: 0,

            transition: "0.3s",
          },
        }}
      >
        <Grids
          is_flex
          flex_direction="column"
          justify_content="space-around"
          align_items="flex-start"
          padding="20px"
          height="100%"
          font_size="16px"
          font_weight="550"
        >
          <Grids>판매상태 변경</Grids>
          {/* _onClick={() => postStateSet()} */}
          <Grids _onClick={() => history.push("/edit/" + postId)}>
            게시글 수정
          </Grids>
          <Grids _onClick={delPost}>삭제</Grids>
        </Grids>
      </ReactModal>
    </React.Fragment>
  );
};

MainCard.defaultProps = {
  page: null,
  userInfo: {
    userid: 0,
    nickname: "",
    rate: 36.5,
    address: "",
    profileImage: "",
  },
  postId: 0,
  title: "",
  content: "",
  category: "",
  createdAt: "",
  image: [],
  price: 0,
  viewCnt: 0,
  likeCnt: 0,
  state: true,
  consumer: "",
};

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  border-radius: 10px;
`;

export default MainCard;