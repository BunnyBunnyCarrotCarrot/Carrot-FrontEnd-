import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Grids from "../elements/Grids";
import { HiUpload } from 'react-icons/hi';
import styled from "styled-components";
import { imgActions } from "../redux/modules/Image";
const Imageupload = (props) =>{
    //이미지 첨부파일 및 프리뷰
    const [imgpreview, setImgpreview] = useState([]);
    const [imgfile, setImgfile] = useState(null);
    const dispatch = useDispatch();
    const handleAddImgfile = (e)=>{
        console.log(e.target.files);
        const imgList = e.target.files;
        let imgUrlList = [...imgpreview];
        for (let i=0; i<imgList.length; i++){
            const setImgURL=URL.createObjectURL(imgList[i])
            imgUrlList.push(setImgURL)       
        }
        
        if(imgUrlList.length>10){
            imgUrlList = imgUrlList.slice(0,10);
        }
        
        setImgpreview(imgUrlList);
        let imageUrls = [];
        for (const key in imgList){
            if(Object.hasOwnProperty.call(imgList,key)){
                imageUrls.push(imgList[key]);
            }
        }


        dispatch(imgActions.setimg(imageUrls));


    }
    const handleDeleteImage = (i) => {
        setImgpreview(imgpreview.filter((_, index) => index !== i));
      };
    
    return(
        <>
        <Grids is_flex padding="10px">

        <Lab htmlFor="files"onChange={handleAddImgfile} >
            <HiUpload />
            <Elin type = "file" id="files" accept ='image/*'multiple="multiple" />
        </Lab>


            {imgpreview.map((item,i)=>{
                return(
                    <Elpre src={item} key={i}>
                         <Deletebtn onClick={()=>handleDeleteImage(i)}>x</Deletebtn>
                    </Elpre>
                )
            })}
        </Grids>
        
            </>
    );
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