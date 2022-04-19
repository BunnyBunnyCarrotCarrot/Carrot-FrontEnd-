import React, {useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/User";

import { Grids, Input, Text, Button } from '../elements/Index';
// import { FiChevronDown } from 'react-icons/fi'
// import ReactModal from "react-modal";

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const Signup = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [nick, setNick] = useState('');
  const [pwd, setPwd] = useState(''); 
  const [pwc, setPwc] = useState('');

  // 주소용 스테이트들
  // const [address, setAdd] = useState(null);
  // const [open, setOpen] = useState(false);

  // const selAdd = (e) => {
  //   setOpen(false);
  //   setAdd(e.target.innerHTML);
  // }

  // ----------------------------------
  const [location, setLocation] = React.useState('');
  console.log(location)
  
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // 제출용 버튼 함수
  const submit = () =>{
    let reg = /^[a-zA-Z0-9!@#$]{6,15}$/
    if(!reg.test(pwd)){
      window.alert('비밀번호에 사용되는 특수문자는 !,@,#,$ 만 가능합니다.')
      return;
    }
    // 공란 체크
    if(id.length === 0 || nick.length === 0 || pwd.length === 0){
      window.alert('공란이 있습니다.');
      return;
    }
    // 최소 8자 이상
    if( id.length <= 3 || id.length > 15 ){
      window.alert('아이디는 최소 4자, 최대 15자입니다.');
      return;
    }
    if( pwd.length <= 5 || pwd.length > 15 ){
      window.alert('비밀번호는 최소 6자, 최대 15자입니다.');
      return;
    }
    if(nick.length < 6 || nick.length > 10){
      window.alert('닉네임은 최소 6자 최대 10자 입니다.');
      return;
    }
    // 비밀번호 체크
    if(pwd !== pwc){
      window.alert('비밀번호 확인이 일치하지않습니다. 다시 확인해 주세요.');
      return;
    }
    // console.log(id,nick,pwd,pwc,location)
    // ---------------------------------------- dispatch 할것
    dispatch(userActions.signupDB(id,nick,pwd,pwc,location))
  }

  return (
  <Grids  padding='8px' is_flex flex_direction='column' >
    <Grids  B_bottom='2px solid rgba(0,0,0,0.07)' width='100%' is_flex justify_content='center' align_items='center' padding='32px 0'>
      <Text 
      width='auto' 
      margin='0'  
      F_size='36px' 
      F_weight='600' 
      > 회원가입 </Text>
    </Grids>

    <Grids width='80%' padding='16px 0 14px'>
      <Input 
      value={id}
      is_caret='#FF7E36'
      B_radius='5px'
      _onChange={(e)=>{setId(e.target.value)}}
      padding='8px' 
      width='100%' 
      label='아이디' 
      placeholder='아이디를 입력해 주세요.'
      />
    </Grids>

    <Grids width='80%' padding='0 0 14px'>
      <Input 
      value={nick}
      is_caret='#FF7E36'
      B_radius='5px'
      _onChange={(e)=>{setNick(e.target.value)}}
      padding='8px' 
      width='100%'
      label='닉네임' 
      placeholder='닉네임을 입력해 주세요.' 
      />
    </Grids>

    <Grids width='80%' padding='0 0 14px'>
      <Input 
      value={pwd}
      is_caret='#FF7E36'
      B_radius='5px'
      _onChange={(e)=>{setPwd(e.target.value)}}
      padding='8px' 
      width='100%'
      type='password' 
      label='비밀번호' 
      placeholder='비밀번호를 입력해 주세요.' 
      />
    </Grids>

    <Grids width='80%' padding='0 0 20px' >
      <Input 
      value={pwc}
      is_caret='#FF7E36'
      B_radius='5px'
      _onChange={(e)=>{setPwc(e.target.value)}}
      padding='8px' 
      width='100%' 
      type='password'   
      label='비밀번호 확인' 
      placeholder='비밀번호를 확인해 주세요.' 
      />
    </Grids>

    {/* <Grids Border='1px solid #FF7E36' B_radius='8px' is_flex justify_content='space-between' width='100%' padding='8px 16px 8px' _onClick={()=>{setOpen(true)}}>
      {address ? address : '지역선택'}
      <FiChevronDown />
    </Grids> */}
    <FormControl style={{width:"80%"}}>
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
    {/* <ReactModal 
        isOpen={open}
        onRequestClose={props.clearSelectedOption}
        ariaHideApp={false}
        contentLabel="Selected Option">
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >서울특별시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >울산광역시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >광주광역시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >인천광역시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >부산광역시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >대전광역시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >수원시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >안동시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >전주시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >청주시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >진주시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >경주시</Grids>
          <Grids _onClick={selAdd} padding='16px 0' B_bottom='1px solid #ddd' >창원시</Grids>
    </ReactModal> */}

    <Grids padding='16px 0 0' width='80%'>
      <Button 
      width='100%'
      height='30px'
      _onClick={submit} 
      Border='1px solid rgba(0,0,0,0.07)' 
      B_radius='10px' 
      BG_color='#FF7E36'
      font_color='#fff'
      >가입하기</Button>
    </Grids>
  </Grids>
  
  );
};

Signup.defaultProps = {};

export default Signup;