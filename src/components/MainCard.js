import React from "react";
import styled from "styled-components";
import { Grids, TextLabel } from "../elements/Index";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import ReactModal from "react-modal";
import "../shared/App.css";
import { useDispatch } from "react-redux";
import itemActions from "../redux/modules/Itemredux"
import { history } from "../redux/configStore";
import { useSelector } from "react-redux";

const MainCard = (props) => {
  const dispatch = useDispatch();

  const { page, modifiedAt, itemId, title, price, likeCount, soldOut,imageUrls } = props; 

  

  const [ModalState, setModalState] = React.useState(false);
  const [likeState, setLikeState] = React.useState(false);

  const likeChange = () => {
    setLikeState(!likeState);
  };


  const delItem = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(itemActions.DeleteItemDB(itemId));
    }
  };


  const itemStateSet = () => {
    dispatch(itemActions.itemStateDB(itemId, soldOut));
    setModalState(false);
  };

  return (
    <React.Fragment>
      <Grids
        B_bottom="1px solid rgba(0,0,0,0.07)"
        padding="20px"
        gap="15px"
        is_flex
        align_items="flex-start"
        position="relative"
      >
        <Grids width="28%" _onClick={() => history.push("item/detail/" + itemId)}>
          <AspectInner src={imageUrls[0]} />
        </Grids>
        <Grids
          is_flex
          flex_direction="column"
          align_items="flex-start"
          gap="5px"
          width="60%"
        >
          
          <TextLabel padding="10px 10px 0 10px" F_size="35px" >
            {title}
          </TextLabel>
          <TextLabel  padding="10px 10px 0 10px" F_color="#4D5159">
            위치: 업로드시간: {modifiedAt}</TextLabel>
          <Grids is_flex gap="10px">
            {soldOut && (
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
            <TextLabel padding="10px 10px 0 10px" F_size="28px" F_weight="bold">{price}원</TextLabel>
          </Grids>
        </Grids>
        <Grids position="absolute" right="10px" bottom="10px" is_flex gap="5px">
          <IoHeartOutline />
          <TextLabel>{likeCount}</TextLabel>
        </Grids>

        <Grids position="absolute" top="15px" right="10px">
          {page === "like" ? (  //???
            <Grids
              font_size="50px"
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
          <Grids _onClick={() => itemStateSet()}>판매상태 변경</Grids>
          <Grids _onClick={() => history.push("/edit/" + itemId)}>
            게시글 수정
          </Grids>
          <Grids _onClick={delItem}>삭제</Grids>
        </Grids>
      </ReactModal>
    </React.Fragment>
  );
};

MainCard.defaultProps = {
  page: null,
  user: {
    id: 0,
    userName: "",
    rate: 36.5,
    location: "",
    imgUrl: "",
  },
  id: 0,
  title: "",
  about: "",
  category: "",
  modifiedAt: "",
  images: [],
  price: 0,
  viewCount: 0,
  likeCount: 0,
  soldOut: true,
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