/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import PostCard from "./PostCard";
import {getPost} from "../../State/Posts/PostSlice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Divider} from "@mui/material";

const PostDetails = ({item}) => {
  const id = useParams().postId;
  const dispatch = useDispatch();
  const {post} = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [post.newPost]);

  return (
    <div className="mt-5">
      <PostCard item={post.post} />
      <Divider>Comments</Divider>
      <div className="space-y-2">
        {post?.post?.comments.map((item) => (
          <PostCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
