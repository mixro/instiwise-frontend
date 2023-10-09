import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
      //LOGIN
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

      //GOOGLE
    googleLoginStart: (state) => {
      state.isFetching = true;
    },
    googleLoginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = true;
    },
    googleLoginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

      //REGISTER
    registerStart: (state) => {
        state.isFetching = true;
    },
    registerSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.isFetching = false;
        state.error = false;
    },
    regiterError: (state) => {
        state.error = true;
    },

      //UPDATE
    updateUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    updateUserSuccess: (state, action) => {
      return {
        ...state,
        isFetching: false,
        currentUser: {
          ...state.currentUser, // Preserve existing user data
          ...action.payload,    // Update with new user data
        },
        error: false,
      };
    },   
    updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },

      // DELETE USER
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null; 
      state.error = false;
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },    

      //LOGOUT
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerSuccess, 
  regiterError,
  logout,
  registerStart,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  googleLoginFailure,
  googleLoginSuccess,
  googleLoginStart
} = userSlice.actions;
export default userSlice.reducer;
