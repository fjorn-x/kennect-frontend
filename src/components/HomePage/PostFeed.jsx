/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import PostCard from "./PostCard";
import SearchIcon from "@mui/icons-material/Search";
import {Button, CircularProgress, TextField, styled} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createPost, getAllPosts} from "../../State/Posts/PostSlice";
import HelperCard from "./HelperCard";
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    content: yup.string().required(),
  });

  const validationSchema2 = yup.object().shape({
    search: yup.string(),
  });

  const handleSubmit = (values, actions) => {
    dispatch(createPost(values));
    actions.resetForm();
  };
  const handleSubmit2 = (values, actions) => {
    navigate(`/?search=${values.search}`);
    dispatch(getAllPosts(values.search));
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
  const formik2 = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: handleSubmit2,
    validationSchema2,
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [post.newPost]);

  return (
    <div className="first-line:overscroll-none my-2 space-y-2">
      <form onSubmit={formik2.handleSubmit} className="flex justify-between items-center">
        <div className="relative flex items-center">
          <input
            type="text"
            id="search"
            name="search"
            value={formik2.values.search}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            className="py-1 rounded-sm bg-black outline-none w-[400px] pl-10 border text-white"
            placeholder="Search"
          />
          <div className="absolute left-0 pl-2">
            <SearchIcon className="text-gray-500" size="small" />
          </div>
        </div>
        <Button
          sx={{
            width: "",
            borderRadius: "10px",

            py: "4px",
            px: "20px",
            bgcolor: "#9d174d",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          variant="contained"
          type="submit"
          className="hover:bg-black "
        >
          Search
        </Button>
      </form>
      <form onSubmit={formik.handleSubmit} className="border p-5 text-white max-w-[500px]">
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
        {post.loading && <CircularProgress />}
        {post.posts.length > 1 ? post?.posts?.map((item) => <PostCard item={item} />) : <HelperCard />}
      </section>
    </div>
  );
};

export default PostFeed;
