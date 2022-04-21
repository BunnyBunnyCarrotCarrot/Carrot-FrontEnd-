import "./App.css";
import React from "react";
import styled from "styled-components";
import {
  Detail,
  // Edit,
  Login,
  Main,
  MyPage,
  // Post,
  // MyPage,
  Item,
  Signup,
  Start,
  ProfileModify,
  // MyPageBuy,
  // MyPageSell,
  // MyPageLike,
  // Review,
  // Chat,
} from "../pages/Index";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/modules/User";
import { history } from "../redux/configStore";

function App() {
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user.userInfo);
  console.log(user)

  React.useEffect(()=>{
    dispatch(userActions.loginCheckDB());
  },[])


  return (
    <React.Fragment>
      {/* <Containers> */}
      {/* <Container maxWidth="lg" minWidth="sm"> */}
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Start} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/main" exact component={Main} />

          {/* 게시글 */}
          <Route path="/Item" exact component={Item} />
            {/* <Route path="/edit/:postid" exact component={Edit} /> */}
          <Route path="/Item/detail/:postid" exact component={Detail} />
          {/* <Route path="/chat" exact component={Chat} /> */}

          {/* 내정보 */}
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/profileModify" exact component={ProfileModify} />
          {/* <Route path="/mypage/buy" exact component={MyPageBuy} />
          <Route path="/mypage/sell" exact component={MyPageSell} />
          <Route path="/mypage/like" exact component={MyPageLike} />
          <Route path="/review" exact component={Review} /> */}
        </ConnectedRouter>
      {/* </Container> */}
      {/* </Containers> */}
    </React.Fragment>
  );
}

const Containers = styled.div`
  margin: auto;
  width: 100%;
  max-width: 900px;
  min-height: 100vh;
  box-sizing: border-box;
`;

export default App;