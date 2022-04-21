import React from "react";
import { Grids } from "../elements/Index";
import DetailUserCard from "../components/DetailUserCard";
import DetailContentCard from "../components/DetailContentCard";
import DetailFooter from "../components/DetailFooter";
import DetailSlider from "../components/DetailSlider";
import { useSelector, useDispatch } from "react-redux";
import { ItemActions } from "../redux/modules/Itemredux";

const Detail = (props) => {
  const dispatch = useDispatch();
  const itemId = props.match.params.itemid;

  const itemList = useSelector((state) => state.item.list);

  console.log(itemList);
  
    const itemIdx = itemList.findIndex((el) => el.itemId === parseInt(itemId));
    console.log(itemIdx);
    // //   let item = itemList[];

//   React.useEffect(() => {
//     if (item) {
//       return;
//     }
//     dispatch(ItemActions.DeleteItemDB(props.itemId));
//   });

//   const postData = {
//     title: item?.title,
//     content: post?.content,
//     category: post?.category,
//     likeCnt: post?.likeCnt,
//     viewCnt: post?.viewCnt,
//   };

  return (
      <></>
    // <React.Fragment>
    //   {post && (
    //     <Grids>
    //       <DetailSlider image={post.image} />
    //       <DetailUserCard user={post.user} />
    //       <DetailContentCard {...postData} />
    //       <DetailFooter price={post.price} postId={post.postId} />
    //     </Grids>
    //   )}
    // </React.Fragment>
  );
};

Detail.defaultProps = {};

export default Detail;