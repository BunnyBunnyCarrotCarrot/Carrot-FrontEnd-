import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../Cookie.js";

import { apis } from "../../Api";

// Action

const LOG_IN = "user/LOG_IN";
const LOG_OUT = "user/LOG_OUT";
const GET_USER = "user/GET_USER";

// Action creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// 초기값
const initialState = {
  user: null,
  is_login: false,
};

//middleware
const loginDB = (username, password) => {
  return function (dispatch, getstate, { history }) {
    apis
      .login(username, password)
      .then((res) => {
        console.log(res);
        setCookie("token", res.data.token, 7);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("is_login", true);
        dispatch(logIn({ username: username }));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("없는 회원정보 입니다. 회원가입을 해주세요.");
      });
  };
};
const signupDB = (username, password) => {
  //nickname, pwdCheck)
  return function (dispatch, getstate, { history }) {
    apis
      .signup(username, password) //nickname, pwdCheck
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        window.alert("이미 존재하는 아이디입니다.");
      });
  };
};
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const username = localStorage.getItem("username");
    const tokenCheck = document.cookie;
    if (tokenCheck) {
      dispatch(logIn({ username: username }));
    } else {
      dispatch(logOut());
    }
  };
};
// 로컬스토리지에서 유저네임,쿠키에서 토큰도 꺼내와 토큰이 있으면 로그인을 시키고,
// 스토어에 로그인을 했을 때 로그인을 유지시키고, 
// 이 함수를 모든 페이지에서 디스패치해요. 어? 토큰 있어없어 나와 

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_login");
    dispatch(logOut());
    history.replace("/login");
  };
};

// Reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// reducer를 내보낸다
const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginDB,
  logoutDB,
  signupDB,
  loginCheckDB,
};
export { actionCreators };
