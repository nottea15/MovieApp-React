import axios from "../../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoading: null,
  isAuth: null,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params) => {
    try {
      const { data } = await axios.post("auth/register", params);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const { data } = await axios.get("/auth/get");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const favouriteMovie = createAsyncThunk(
  "auth/favouriteMovie/add",
  async (movie) => {
    try {
      const { data } = await axios.post("/auth/favouriteMovie/add", movie);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const removeFavouriteMovie = createAsyncThunk(
  "auth/favouriteMovie/remove",
  async (movie) => {
    try {
      const { data } = await axios.delete(
        `/auth/favouriteMovie/remove/${movie.id}`,
        movie
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    //register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //get
    [getUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //favouriteMovie
    [favouriteMovie.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [favouriteMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload?.user;
    },
    [favouriteMovie.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //favouriteMovie
    [removeFavouriteMovie.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [removeFavouriteMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload?.user;
    },
    [removeFavouriteMovie.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const { logout } = authSlice.actions;
export const isLogedIn = (state) => Boolean(state.auth.token);
export default authSlice.reducer;
