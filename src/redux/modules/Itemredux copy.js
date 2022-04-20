import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";
import { imgActions } from "./Image";
import formApis from "../../shared/formApi";

import moment from "moment";

//리덕스순서 공유하기 버튼을 눌렀을 때 온클릭에있는 애드포스트함수가 실행되고,
//디스패치를 눌러 애드포스트디비를 통해 미들웨어로 가고, 
//애드포스트디비를 이용해 함수를 실행하고,
//디스패치로 리듀서에 다시보내고, 리듀서에서 스테이트 상태를 드래프트로 바꿔주고,
//정상실행됐으면 언쉬프트를 통해 액션의 페이로드의 포스트리스트의 배열 맨앞에 추가된다. 

//action

const LOAD_ITEM = "Itemredux/LOAD_ITEM"
const EDIT_ITEM = "Itemredux/EDIT_ITEM"
const ADD_ITEM =  "Itemredux/ADD_ITEM"
const DELETE_ITEM = "Itemredux/DELETE_ITEM"

//actioncreators 액션을 만드는애 (액션타입정의, (데이터)=>(데이터)
const loadItem = createAction(LOAD_ITEM, (list)=>(list));
const editItem = createAction(EDIT_ITEM, (itemId, data)=>({itemId,data}));
const addItem = createAction(ADD_ITEM,(data)=>({data}));
const deleteItem = createAction(DELETE_ITEM, (itemId)=>({itemId}));

//initialState
const initialState = {
    list:[],
}

const itemIntialState = {

    itemId : null,
    userName : "text",
    title : "title",
    price : 0,
    about : "text",
    imageUrls : [],
    likeCount : 0,
    likeState : "false",
    categoryId : 0, 
    categoryName : "text",

};
//middlewares 서버에 보내는 단계가 원래 없어서 서버에 보내기 위해서 만들어줌! redux thunk
//그 후에 이어서 리듀서에 액션을 전달함 
//미들웨어 쓰는 이유 서버에 무언가를 요청하기 위해서 중간에 그런 공간이 없었어서 그 공간을 만들어 준 것이다.
//미들웨어 안에 들어가는 것이 썽크함수  썽크함수는 서버에 보내주기 위해서 함수를 쓰는 것이다! 요청하는 함수를 써주면됨!

//이 다음 리듀서에 액션을 저장/ 액션을 보내주는 애는 디스패치

const loaditemDB = () =>{
    return function(dispatch, getState, {history}){
        apis
            .itemsLoad()
            .then((res)=>{
                console.log(res.data);
                dispatch(loadItem(res.data));
            })
            .catch((err)=>{
                console.log('로드에러!!');
            });
        };
    };

const DetailItemDB = (itemId) =>{
    return function(dispatch, getstate,{history}) {
        apis
        .itemIdLoad(itemId)
        .then((res) =>{
            console.log(res.data);
            dispatch(loadItem([res.data]));
        })
        .catch ((error) => {
            console.log('아이템디테일 로드 오류~~')
        });
    };
};

const addItemDB = (data) =>{
    console.log(data);
    
    return function(dispatch, getState, {history}) {
    
        const formdata = new FormData();
        let files = getState().image.files[0];
        
        console.log(files)
        formdata.append("image", files);
        formdata.append(
            "post",
            new Blob([JSON.stringify(data)], { type: "application/json" })
          );
        console.log(formdata);
        formApis
        .posting(formdata)
        //요기까지가 서버에 보내는 과정 이 아래는 서버에서 응답을 받고 난 과정 그래서, 지금 문제는 위의 애들이 안됨
        //그래서, 데이터 형식이 맞는지 백엔드와 이야기 해볼것
        .then((res) =>{
            console.log(res);
            const itemId = initialState.list.legnth;
            const date = moment().format("YYYY-MM-DD");

            dispatch(
                // 리덕스저장용
                addItem({
                    ...itemIntialState,
                    ...data,
                    modefiedAt: date,
                    itemId: itemId
                })
            )
        })
        .catch((err)=>{
            console.log ('글쓰기 에러!')
        })
    }
}

const EditItemDB = (itemId, data) => {
    return function (dispatch, gestate, {history}) {
        apis
        .edit(itemId,data)
        .then((res)=>{
            console.log(res);
            dispatch(editItem(itemId, data));
        })
        .catch((err)=>{
            console.log('수정 오류!!!')
        })
    }
}

const DeleteItemDB = (itemId) => {
    return function (dispatch, getstate, {history}){
        apis
        .del(itemId)
        .then((res)=>{
            console.log(res);
            dispatch(deleteItem(itemId));
        })
        .catch((err) =>{
            console.log('삭제 에러!');
        })
    }
}

const ItemStateDB = (itemId, state) =>{
    return function (dispatch, getstate, {history}) {
        console.log(itemId);
        dispatch(editItem(itemId, {state: !state}))
    }
}
//reducer //최종적으로 상태(state)를 변경시켜주는애. 데이터값이 바뀌고, 정상적으로 작동했다면 리렌더링이 된다. 
export default handleActions(
    {
        [LOAD_ITEM]:(state, action) =>
        produce (state, (draft) =>{
            console.log(action.payload.list);
            draft.list = action.payload.list;
        }),
        [EDIT_ITEM]:(state, action) =>
        produce (state, (draft)=>{
            const itemId = action.payload.itemId;
            draft.list = draft.list.map((el)=> {
                console.log(el.itemId,itemId);
                if(el.itemId === parseInt(itemId)){
                    return {...el, ...action.payload.date};
                }
                return el;
            })
        }),
        [ADD_ITEM]: (state,action)=>
        produce(state,(draft)=>{
            draft.list.unshift(action.payload.data);
        }),
        [DELETE_ITEM]: (state, action) =>
        produce(state,(draft)=>{
            const itemId = action.payload.itemId;
            draft.list = draft.list.filter((el)=>{
                if (el.itemId === itemId){
                    return false;
                }
                return true;
            })
        }),
    },
    initialState
);

const ItemActions = {
    loaditemDB,
    DetailItemDB,
    addItemDB,
    EditItemDB,
    DeleteItemDB,
    ItemStateDB
};

export {ItemActions}