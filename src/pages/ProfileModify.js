import React from "react";
import { useSelector } from "react-redux";
import Header from "../shared/Header";
import { Grids, TextLabel, Button } from "../elements/Index";
import styled from "styled-components";
import profile from "../images/profile.jpeg";
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// import ReactModal from "react-modal";

const ProfileModify = (props) => {

  const user = useSelector(state => state.user.userInfo);
  // const addrList = [
  //   "서울특별시",
  //   "울산광역시",
  //   "광주광역시",
  //   "인천광역시",
  //   "부산광역시",
  //   "대전광역시",
  //   "수원시",
  //   "안동시",
  //   "전주시",
  //   "청주시",
  //   "진주시",
  //   "경주시",
  //   "창원시",
  // ];
  // 버튼 활성화 여부
  const [state, setState] = React.useState(false);

  const [nickname, setNickname] = React.useState("");
  // const [address, setAdd] = React.useState("");
  // const [open, setOpen] = React.useState(false);

  const [location, setLocation] = React.useState('');
  console.log(location)
  
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // const selAdd = (e) => {
  //   setOpen(false);
  //   setAdd(e.target.innerHTML);
  // };

  const editNickname = (e) => {
    setNickname(e.target.value);
  };

  React.useEffect(() => {
    if (nickname && location) {
      setState(true);
    } else {
      setState(false);
    }
  }, [nickname,location]);

  return (
    <React.Fragment>
      <Header title="프로필 수정" />

      <Grids is_flex flex_direction="column" gap="20px" padding="20px">
        <ProfileImage src={user.imgUrl} />
        <Input onChange={(e) => editNickname(e)} />
      

      <FormControl style={{width:"100%"}}>
        <InputLabel id="demo-simple-select-helper-label">지역 선택</InputLabel>
        <Select 
          autoWidth
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={location}
          onChange={handleChange}
        >
          <MenuItem value={11}>서울특별시</MenuItem>
          <MenuItem value={26}>부산광역시</MenuItem>
          <MenuItem value={28}>대구광역시</MenuItem>
          <MenuItem value={29}>인천광역시</MenuItem>
          <MenuItem value={30}>대전광역시</MenuItem>
          <MenuItem value={31}>울산광역시</MenuItem>
          <MenuItem value={36}>세종특별자치시</MenuItem>
          <MenuItem value={41}>경기도</MenuItem>
          <MenuItem value={42}>강원도</MenuItem>
          <MenuItem value={43}>충청북도</MenuItem>
          <MenuItem value={44}>충청남도</MenuItem>
          <MenuItem value={45}>전라북도</MenuItem>
          <MenuItem value={46}>전라남도</MenuItem>
          <MenuItem value={47}>경상북도</MenuItem>
          <MenuItem value={48}>경상남도</MenuItem>
          <MenuItem value={50}>제주특별자치도</MenuItem>
        </Select>
        <FormHelperText>지역을 선택해주세요.</FormHelperText>
      </FormControl>
      </Grids>

      <EditBtn state={state}>완료</EditBtn>

      {/* <ReactModal
        isOpen={open}
        ariaHideApp={false}
        onRequestClose={() => setOpen(false)}
        style={{
          overlay: {
            zIndex: 3,
          },
          content: {
            height: "400px",
            top: "50%",
            transform: "translate(0,-50%)",
          },
        }}
      >
        {addrList.map((el, i) => {
          return (
            <Grids
              padding="16px 0"
              B_bottom="1px solid #ddd"
              key={i}
              _onClick={(e) => selAdd(e)}
            >
              {el}
            </Grids>
          );
        })}
      </ReactModal> */}
    </React.Fragment>
  );
};

const ProfileImage = styled.img`
  width: 120px;
`;

const EditBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 18px;
  border: 0;
  color: white;
  font-size: 19px;
  font-weight: bold;
  background-color: ${(props) =>
    props.state ? "#FF7E36" : "rgba(0, 0, 0, 0.15)"};
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  text-align: center;
  outline: none;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.7);
    caret-color: #ff7e36;
  }
`;

export default ProfileModify;