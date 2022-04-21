import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import { act } from "react-dom/test-utils";

// actionCreate
const SET_USER = "SET_USER";
const SET_SMAE = "SET_SAME";
const LOGOUT = 'user/LOGOUT';

// action
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const logOut = createAction(LOGOUT, (user) => ({ user }));
const setSame = createAction(SET_SMAE, (same) => ({ same }));

// initial State
const initialState = {
  userInfo : {
  userName:"당근입니다잉",
  userLocation: "울산광역시",
  imgUrl:"https://bucketlist5.s3.ap-northeast-2.amazonaws.com/당근이.png"
  }
};

// middlewares
const signupDB = (id, nick, pwd, pwc, location) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(id, nick, pwd, pwc, location)
      // console.log(id, nick, pwd, pwc, location)
      .then((res) => {
        console.log(res);
        window.alert("회원가입 완료!");
        history.replace("/login");
      })
      .catch((res) => {
        console.log(res.response);
        window.alert("아이디 또는 닉네임이 중복됩니다.");
      });
  };
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((res) => {
        console.log(res)
        setCookie('token', res.headers.authorization, 3);
        localStorage.setItem('userName', res.data.userName )
        localStorage.setItem('userLocation', res.data.location.name)
        localStorage.setItem('imgUrl', res.data.imgUrl)

        const userInfo = {
        userName : localStorage.getItem('userName'),
        userLocation: localStorage.getItem('userLocation'),
        imgUrl: localStorage.getItem('imgUrl')
        };
        dispatch(setUser(userInfo)); 
        history.replace("/main");
      })
      .catch((err) => {
        console.log("err", err.response);
      });
  };
};

const logOutDB = () => {
	return function (dispatch, getState, { history }) {
		deleteCookie('token');
		localStorage.removeItem('userName');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('imgUrl');
		dispatch(logOut());
		history.replace('/login');
	};
};

const loginCheckDB = () => {
	return function (dispatch, getState, { history }) {
		const userInfo = {
      userName : localStorage.getItem('userName'),
      userLocation: localStorage.getItem('userLocation'),
      imgUrl: localStorage.getItem('imgUrl')
    };
		const tokenCheck = document.cookie;
		if (tokenCheck) {
			dispatch(setUser(userInfo));
		} else {
      window.alert("다시 로그인 해주세요!");
      history.replace("/login");
      // console.log("error from check", err);
		}
	};
};

// const logincheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .check()
//       .then((res) => {
//         dispatch(setUser(res.data));
//       })
//       .catch((err) => {
//         window.alert("다시 로그인 해주세요!");
//         history.replace("/login");
//         console.log("error from check", err);
//       });
//   };
// };

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
      [LOGOUT]: (state, action) =>
			produce(state, (draft) => {
				draft.user = null;
			}),
    [SET_SMAE]: (state, action) => 
      produce(state, (draft) => {
        draft.is_same = action.payload.same;
      }),
  },
  initialState
);

const userActions = {
  loginDB,
  signupDB,
  logOutDB,
  loginCheckDB,
};

export { userActions };