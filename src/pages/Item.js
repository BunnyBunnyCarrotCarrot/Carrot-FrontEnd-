import React,{useState} from "react";
import { history } from "../redux/configStore";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Header from "../shared/Header";
import Grids from "../elements/Grids";
import Imageupload from "../components/Imageupload";
import { Category, SettingsOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { ItemActions } from "../redux/modules/Itemredux";
import { imgActions } from "../redux/modules/Image";

const Item = (props) =>{
    const dispatch = useDispatch();
     React.useEffect(() => {
    dispatch(imgActions.initimg());
    }, []);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [about, setAbout] = useState("");
    
    const [cate,setCate] = useState("");
    const handleChange = (e) => {
        setCate(e.target.value);
      };

    const [itemdispatch, setitemDispatch] = useState(true);
    
    const least = () => {
        if (title.length !== 0 && about.length !== 0 && cate) {
          setitemDispatch(false);
        }
        if (title.length === 0 || about.length === 0) {
          setitemDispatch(true);
        }
      };


    const posting =()=>{
            setitemDispatch(true);

            let data = {
                title: title,
                price: price,
                about: about,
                category: cate,
                
            };
            dispatch(ItemActions.addItemDB(data));
            history.push("/main");
    };
    
    return(
        <>
        <Header title="write" itemdispatch={itemdispatch} _onClick={posting}/>
        <Grids width="100%" padding="8px">
        
        {/* 사진업로드 */}
        <Grids
          padding="10px 4px"
          width="100%"
          B_bottom="1px solid rgba(0,0,0,0.07)"
        >
        <Imageupload/>
        </Grids>
        
        {/* 제목 */}
        <Grids
          padding="16px 4px"
          width="100%"
          B_bottom="1px solid rgba(0,0,0,0.07)"
        >
        <input type="text" onKeyUp={least} placeholder="제목" onChange={(e)=>{setTitle(e.target.value);}}
        style={{border: "none", outline: "none", width: "100%", caretColor: "#FF7E36"}}/>
        
        </Grids>
        
        {/* 카테고리 */}
        <Grids
          padding="16px 0px 20px 4px"
          width="100%"
          B_bottom="1px solid rgba(0,0,0,0.07)"
        >
        
        <FormControl style={{width:"100%"}}>
        <InputLabel id="demo-simple-select-helper-label">카테고리 선택</InputLabel>
        
        <Select 
          autoWidth
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cate}
          onChange={handleChange}
        >
          <MenuItem value={1}>디지털기기</MenuItem>
          <MenuItem value={2}>생활가전</MenuItem>
          <MenuItem value={3}>가구/인테리어</MenuItem>
          <MenuItem value={4}>유아동</MenuItem>
          <MenuItem value={5}>생활/가공식품</MenuItem>
          <MenuItem value={6}>유아도서</MenuItem>
          <MenuItem value={7}>스포츠/레저</MenuItem>
          <MenuItem value={8}>여성잡화</MenuItem>
          <MenuItem value={9}>여성의류</MenuItem>
          <MenuItem value={10}>남성패션/잡화</MenuItem>
          <MenuItem value={11}>게임/취미</MenuItem>
          <MenuItem value={12}>뷰티/미용</MenuItem>
          <MenuItem value={13}>반려동물용품</MenuItem>
          <MenuItem value={14}>도서/티켓/음반</MenuItem>
          <MenuItem value={15}>식물</MenuItem>
          <MenuItem value={16}>기타 중고물품</MenuItem>
        </Select>
        
      </FormControl>
      </Grids>

        {/* 가격 */}
        <Grids is_flex justify_content="space-between"
          padding="16px 4px" width="100%" B_bottom="1px solid rgba(0,0,0,0.07)"> 
        <Grids is_flex justify_content="space-between">
            {price.length === 0 ? (
              <div style={{ display: "inline-block", padding: "4px",
                  width: "auto",color: "rgba(0,0,0,0.5)", fontSize: "12px"}}>
                ￦</div>
            ) : (
              <div style={{ display: "inline-block", padding: "4px",
                  width: "auto", color: "#000", fontSize: "12px"}}>
                ￦</div>
            )}

            <input type="number" onChange={(e) => {setPrice(e.target.value);}}
              style={{ width: "auto", border: "none", outline: "none", caretColor: "#FF7E36"}}
              placeholder="가격(선택사항)"/>

          </Grids>

          <Grids>
            <input type="checkbox" />
            <div style={{display: "inline-block", width: "auto", fontSize: "12px"}}>
              가격 제안받기</div>
          </Grids>
          </Grids>
        
        {/* 내용 */}
        <Grids padding="16px 4px" width="100%">
        <textarea rows={10}  onKeyUp={least} onChange={(e)=>{setAbout(e.target.value);}}
        placeholder= "userLocation에 올릴 게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있어요."
        style={{ width: "100%", lineHeight: "2", border: "none", outline: "none", caretColor: "#FF7E36"}}/>
        </Grids>
        </Grids>
        </>
    );
}



export default Item;