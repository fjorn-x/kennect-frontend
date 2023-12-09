import React from "react";
import CommentModal from "./CommentModal";
import {useNavigate} from "react-router-dom";

const PostCard = ({item}) => {
  const navigate = useNavigate();
  return (
    <div className="border w-[500px] p-3  text-white ">
      <div className="space-y-2 cursor-pointer" onClick={() => navigate(`/post/${item?._id}`)}>
        <div className="text-lg font-bold ">{item?.user?.name}</div>
        <div className="text-sm cursor-pointer">{item?.content}</div>
      </div>

      <div className="flex items-center text-white">
        <CommentModal item={item} />
        <p>{item?.comments.length}</p>
      </div>
    </div>
  );
};

export default PostCard;
