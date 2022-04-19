import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// action
const SET_PRE = "SET_PRE";
const INIT_PRE = "INIT_PRE";
const DEL_PRE = "DEL_PRE";
const EDIT_PRE = "EDIT_PRE";

const SET_PRO = "SET_PRO";
const DEL_PRO = "DEL_PRO";
const INIT_PRO = "INIT_PRO";

// actioncreators
const setPre = createAction(SET_PRE, (pre, data) => ({ pre, data }));
const initPre = createAction(INIT_PRE, () => ({}));
const delPre = createAction(DEL_PRE, (index) => ({ index }));
const editPre = createAction(EDIT_PRE, (pres) => ({ pres }));

const setPro = createAction(SET_PRO, (pro, file) => ({ pro, file }));
const delPro = createAction(DEL_PRO, () => ({}));
const initPro = createAction(INIT_PRO, (file) => ({ file }));

// initialState
const initialState = {
  pres: [],
  files: [],
  pro: [],
  profile: [],
};

// middlewares 사실상 무쓸모

// reducer
export default handleActions(
  {
    // 포스트 작성용 프리뷰

    [SET_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.pres = [...draft.pres, action.payload.pre];
        draft.files = [...draft.files, action.payload.data];
      }),
    [INIT_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.pres = [];
        draft.files = [];
      }),
    [DEL_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.pres = draft.pres.filter((p, i) => i !== action.payload.index);
        draft.files = draft.files.filter((p, i) => i !== action.payload.index);
      }),
    [EDIT_PRE]: (state, action) => produce(state, (draft) => {}),
    // 프로필 선택용
    [SET_PRO]: (state, action) =>
      produce(state, (draft) => {
        draft.pro = [action.payload.pro, action.payload.file];
      }),
    [DEL_PRO]: (state, action) =>
      produce(state, (draft) => {
        draft.pro = [];
      }),
  },
  initialState
);

const imgActions = {
  setPre,
  initPre,
  delPre,
  editPre,
  setPro,
  initPro,
  delPro,
};

export { imgActions };