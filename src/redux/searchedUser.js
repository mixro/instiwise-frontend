import { createSlice } from "@reduxjs/toolkit";

const searchedUserSlice = createSlice({
  name: "searchedUser",
  initialState: {
    searchedUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET USER
    getUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    getUserSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.searchedUser = action.payload;
    },
    getUserFailure: (state) => {
        state.error = true;
        state.isFetching = false;
    },

    //CONNECT USER
    connectWithUser: (state, action) => {
        const currentUserId = action.payload.currentUserId;
    
        const isConnected = state.searchedUser.connections.includes(currentUserId);
    
        // Update the connections array based on the current state
        if (isConnected) {
            // If the current user is already connected, disconnect
            state.searchedUser.connections = state.searchedUser.connections.filter(
            (userId) => userId !== currentUserId
            );
        } else {
            // If the current user is not connected, connect
            state.searchedUser.connections.push(currentUserId);
        }
    },
  },
});

export const { 
    getUserFailure,
    getUserSuccess,
    getUserStart,
    connectWithUser,
} = searchedUserSlice.actions;
export default searchedUserSlice.reducer;
