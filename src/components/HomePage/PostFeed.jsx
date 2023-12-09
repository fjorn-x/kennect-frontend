/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import PostCard from "./PostCard";
import SearchIcon from "@mui/icons-material/Search";
import {Button, TextField, styled} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createPost, getAllPosts} from "../../State/Posts/PostSlice";

const NoBorderTextField = styled(TextField)({
  ".css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "0px 0px 16.5px 0px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    padding: "0px 14px",
    border: "none",
  },
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      borderBottom: "none",
    },
  },
});

const PostFeed = () => {
  const {post} = useSelector((store) => store);

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    content: yup.string().required(),
  });

  const handleSubmit = (values, actions) => {
    dispatch(createPost(values));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      isPost: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [post.newPost]);

  return (
    <div className="first-line:overscroll-none my-2 space-y-2">
      <div className="relative flex items-center ">
        <input type="text" className="py-1 rounded-full bg-gray-200 w-[500px] pl-10 border text-white" placeholder="Search" />
        <div className="absolute left-0 pl-2">
          <SearchIcon className="text-gray-500" size="small" />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="border p-5 text-white">
        <div>
          <NoBorderTextField
            id="content"
            name="content"
            fullWidth
            inputProps={{
              style: {
                padding: 0,
                color: "white",
              },
            }}
            placeholder="Create a Post"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            multiline
            minRows={1}
            maxRows={5}
          />
        </div>
        <div className="flex justify-end">
          <Button
            sx={{
              width: "100%",
              borderRadius: "20px",

              py: "8px",
              px: "20px",
              bgcolor: "#9d174d",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            variant="contained"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className="hover:bg-black "
          >
            Post
          </Button>
        </div>
      </form>
      <section className="space-y-4">
        {post?.posts?.map((item) => (
          <PostCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default PostFeed;
