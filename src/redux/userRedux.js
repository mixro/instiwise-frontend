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

      //GOOGLE LOGIN
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

      //GOOGLE REGISTER
    googleRegisterStart: (state) => {
      state.isFetching = true;
    },
    googleRegisterSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = true;
    },
    googleRegisterFailure: (state) => {
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

      //GET CURRENT USER
    getCurrentUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    getCurrentUserSuccess: (state, action) => {
        return {
          ...state,
          isFetching: false,
          currentUser: {
            ...state.currentUser,
            ...action.payload,
          },
          error: false,
        }
    },
    getCurrentUserFailure: (state) => {
        state.error = true;
        state.isFetching = false;
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

    // CONNECT WITH CURRENT USER CONNECTION
    connectWithCurrentUserConnection: (state, action) => {
      const userIndex = state.currentUser.connections.findIndex((item) => item._id === action.payload.otherUserId);
      if (userIndex !== -1) {
          const userToBeConnected = state.currentUser.connections[userIndex];
          const currentUserIdIndex = userToBeConnected.connections.indexOf(action.payload.currentUserId);

          if (currentUserIdIndex === -1) {
              userToBeConnected.connections.push(action.payload.currentUserId);
          } else {
              userToBeConnected.connections.splice(currentUserIdIndex, 1);
          }
      }
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
  googleLoginStart,
  googleRegisterFailure,
  googleRegisterSuccess,
  googleRegisterStart,
  getCurrentUserFailure,
  getCurrentUserSuccess,
  getCurrentUserStart,
  connectWithCurrentUserConnection
} = userSlice.actions;
export default userSlice.reducer;
