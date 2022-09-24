import axios from "../../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  isLoading: null,
  status: null,
};

export const getAllUsers = createAsyncThunk("users/geatAll", async () => {
  try {
    const { data } = await axios.get("users/getUsers");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = null;
      state.isLoading = null;
      state.status = null;
    },
  },
  extraReducers: {
    //getAll
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.users = action.payload?.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
