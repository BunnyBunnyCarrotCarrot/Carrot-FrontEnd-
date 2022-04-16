import React, {useState} from "react";

import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";

import { Grids, Input, Text, Button } from '../elements/Index';
import { userActions } from "../redux/modules/User";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const submit = () =>{
    // 공란 체크
    if(id.length === 0 || pwd.length === 0){
      window.alert('공란이 있습니다.');
      return;
    }
    // 최소 8자 이상
    if(id.length < 8 || pwd.length < 8){
      window.alert('아이디와 비밀번호는 최소 8자입니다.');
      return;
    }
    // dispatch
    dispatch(userActions.loginDB(id,pwd))
  }

  return (
  <Grids  padding='8px' is_flex flex_direction='column' >
    {/* 로그인 창 제목 */}
    <Grids  B_bottom='2px solid rgba(0,0,0,0.07)' width='100%' is_flex justify_content='center' align_items='center' padding='32px 0'>
      <Text 
      width='auto' 
      margin='0'  
      F_size='36px' 
      F_weight='600' 
      > 로그인 </Text>
    </Grids>
    {/* 아이디 입력창 */}
    <Grids width='80%' padding='16px 0 16px'>
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
    {/* 비밀번호 입력창 */}
    <Grids width='80%' padding='0 0 16px'>
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
    {/* 로그인 버튼 */}
    <Grids padding='16px 0 20px' B_bottom='1px solid #000' width='80%'>
      <Button 
      width= '100%'
      height='30px'
      _onClick={submit}  
      Border='1px solid rgba(0,0,0,0.07)' 
      B_radius='10px' 
      BG_color='#FF7E36'
      font_color='#fff'
      >로그인</Button>
    </Grids>
    {/* 회원가입 안내 문구 */}
    <Grids padding='8px 0 0'>
      <Text F_color='#FF7E36' >아직 회원이 아니라면?</Text>
    </Grids>
    {/* 회원가입 이동 페이지 버튼 */}
    <Grids padding='8px 0 0' width='80%'>
      <Button 
      width='100%'
      height='30px'
      _onClick={()=>{history.push('/signup')}}  
      Border='1px solid rgba(0,0,0,0.07)' 
      B_radius='10px' 
      BG_color='#FF7E36'
      font_color='#fff'
      >회원가입</Button>
    </Grids>
  </Grids>
  );
};

Login.defaultProps = {};

export default Login;