import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

export const registerUser = createAsyncThunk("auth/register", async (registerData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, registerData);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log(data);
    return data.token;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const loginUser = createAsyncThunk("auth/login", async (loginData, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    return data.token;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUserProfile = createAsyncThunk("auth/getProfile", async (jwt, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: {Authorization: `Bearer ${jwt}`},
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

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem("jwt");
      return initialState;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.jwt = payload;
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.jwt = payload;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
    [getUserProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserProfile.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.user = payload;
    },
    [getUserProfile.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {logoutUser} = AuthSlice.actions;

export default AuthSlice.reducer;
