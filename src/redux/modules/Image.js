import { createAction,  handleActions } from "redux-actions";
import {produce} from "immer";

//action
const SET_IMG = "Image/SET_IMG"
const DEL_IMG = "Image/DEL_IMG"
const INIT_IMG = "Image/INIT_IMG"

//actionCreator
const setimg = createAction(SET_IMG, (files)=>({files})); //preview 값을 안받아도 되는지?
const initimg = createAction(INIT_IMG, ()=>({}));
const delimg = createAction(DEL_IMG, (index)=>({index})); //프리뷰 배열에서 해당 인덱스만 지워주면됨.
//initialState
const initialState={

    files:[],

}

//middlewares


//reducer

export default handleActions(
    {
        [SET_IMG]: (state, action) =>
        produce(state,(draft)=>{
            draft.files =action.payload.files; 
        }),

        [INIT_IMG]: (state, action) =>
        produce(state, (draft) => {
          draft.files = [];
        }),

        [DEL_IMG]: (state, action) =>
        produce(state,(draft)=>{
            draft.files=draft.files.filter((a,i)=>i !==action.payload.index);
        })

    },
    initialState
)


const imgActions = {
    setimg,
    delimg,
    initimg,
}

export {imgActions};
