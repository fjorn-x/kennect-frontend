import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk("Post/create", async (PostData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, PostData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getAllPosts = createAsyncThunk("api/getAllPosts", async (Data, thunkAPI) => {
  try {
    if (Data) {
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/?search=${Data}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
      });
      return data;
    }
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
    });
    console.log(` get all data ${data}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
export const getPost = createAsyncThunk("api/getPost", async (postId, thunkAPI) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/singlePost/${postId}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const replyPost = createAsyncThunk("api/replyPost", async (PostData, {rejectWithValue}) => {
  try {
    console.log("reply  post" + JSON.stringify(PostData));

    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts/reply`, PostData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(`reply ${data}`);
    return data;
  } catch (error) {
    console.log(`reply ${error}`);

    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
const initialState = {
  loading: false,
  newPost: null,
  error: null,
  posts: [],
  post: null,
  replies: [],
};

const PostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    postBack(state) {
      state.post = null;
      return state;
    },
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },

    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    // [getUserPosts.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [getUserPosts.rejected]: (state, {payload}) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    [replyPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [replyPost.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },

    [createPost.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.posts = [payload, ...state.posts];
      state.newPost = payload;
    },

    [getAllPosts.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.posts = payload;
      state.post = null;
      state.replies = [];
    },

    // [getUserPosts.fulfilled]: (state, {payload}) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.posts = payload;
    // },

    [replyPost.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.newPost = payload;
    },

    [getPost.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.post = payload;
    },
    [getPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPost.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const {postBack} = PostSlice.actions;

export default PostSlice.reducer;
