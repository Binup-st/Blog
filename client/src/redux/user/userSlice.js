import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log(action.payload);
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state)=>{
      state.loading = true
      state.error = null
    },
    deleteUserSuccess :(state)=>{
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteUserFailure: (state, action)=>{
      state.loading = false
      state.error = action.payload
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart } = userSlice.actions;
export default userSlice.reducer;
