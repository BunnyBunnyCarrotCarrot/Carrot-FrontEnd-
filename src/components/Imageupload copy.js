import React,{useState} from "react";

import { useSelector, useDispatch } from "react-redux";

import Grids from "../elements/Grids";
import { HiUpload } from 'react-icons/hi';
import styled from "styled-components";
import { imgActions } from "../redux/modules/Image";

const Imageupload = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector(state => state.image.pres);
    const fileInput = React.useRef();

    const select = (e) => {
        const reader = new FileReader();
        let file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            dispatch(imgActions.setimg(reader.result,file));
        }
    }

    return(

        <Grids is_flex width='auto'>
            <Lab htmlFor="up" >
                    <HiUpload />
            </Lab>
            <Elin ref={fileInput} onChange={select} type='file' id="up"/>
            { preview.map((p,i)=>{
                return (
                    <Grids key={i} padding='0 4px'>
                        <Elpre src={p} >
                            {/* i를 통해 해당 배열의 인덱스를 보내준다. 삭제 가능 */}
                            <Deletebtn onClick={()=>{dispatch(imgActions.delPre(i))}} >x</Deletebtn>
                        </Elpre>
                    </Grids>
                )
            }) }
        </Grids>
    )
}
const Lab = styled.label`
    display: block;
    text-align: center;
    line-height: 100px;
    font-size: 18px;
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 3px;
    cursor: pointer;
`;

const Elin = styled.input`
    display: none;
`;

const Elpre = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 3px;
    background-image: url('${props => props.src}');
    background-size: cover;
    position: relative;
`; 

const Deletebtn = styled.div`
    color: #FFF;
    font-size: 3px;
    text-align: center;
    line-height: 13px;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #000;
    position: absolute;
    right: -5px;
    top: -5px;
    cursor: pointer;
`


export default Imageupload;