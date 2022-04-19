import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/apis";
import { imgActions } from "./Image";
import formApis from "../../shared/formApi";

import moment from "moment";

//action

const LOAD_ITEM = "Itemredux/LOAD_ITEM"
const EDIT_ITEM = "Itemredux/EDIT_ITEM"
const ADD_ITEM =  "Itemredux/ADD_ITEM"
const DELETE_ITEM = "Itemredux/DELETE_ITEM"

//actioncreators
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
//middlewares

const loaditemDB = () =>
    async(dispatch, getState, {history}) =>{
        try {
            const {data} = await apis.itemsLoad();
            dispatch(loadItem(data));
            dispatch(imgActions.setpreview(null));

        }catch(e){
            console.log(`아이템들 로드 오류~~`)
        }
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
    return function(dispatch, getstate, {history}) {
        const formdata = new FormData();
        let files = getstate().image.files;
        
        formdata.append("image",files);
        formdata.append(
            "item",
            new Blob([JSON.stringify(data)], {type: "application/json"})
        );

        formApis
        .posting(formdata)
        .then((res) =>{
            console.log(res);
            const itemId = initialState.list.legnth;
            const date = moment().format("YYYY-MM-DD");

            dispatch(
                addItem({
                    ...itemIntialState,
                    ...data,
                    createdAt: date,
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
//reducer
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