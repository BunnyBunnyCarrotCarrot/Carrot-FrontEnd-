import React from "react";
import { Grids } from "../elements/Index";
import DetailUserCard from "../components/DetailUserCard";
import DetailContentCard from "../components/DetailContentCard";
import DetailFooter from "../components/DetailFooter";
import DetailSlider from "../components/DetailSlider";
import { useSelector, useDispatch } from "react-redux";
import { ItemActions } from "../redux/modules/Itemredux";
import { useParams } from "react-router-dom";

const Detail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const itemId = props.match.params.itemId;

  React.useEffect(()=>{
    dispatch(ItemActions.DetailLoadDB(itemId))
  },[])
  
  const itemList = useSelector((state) => state.item);
  console.log(itemList);
  const itemIdx = itemList.list.findIndex((el) => el.itemId === parseInt(itemId));
  let item = itemList[itemIdx];

  React.useEffect(() => {
    if (item) {
      return;
    }
    dispatch(ItemActions.DetailLoadDB(itemId));
  });

  const itemData = {
    title: itemList.title,
    content: itemList.about,
    category: itemList.categoryName,
    likeCnt: itemList.likeCount,
  };

  return (
    <React.Fragment>
        <Grids>
        
        
          <DetailSlider image={itemList.list.imageUrls} />
          <DetailUserCard user={itemList.list.userName} />
          <DetailContentCard {...itemData} />
          <DetailFooter price={itemList.list.price} itemId={itemList.list.itemId} />
        </Grids>
        
    </React.Fragment>
  );
};

Detail.defaultProps = {};

export default Detail;