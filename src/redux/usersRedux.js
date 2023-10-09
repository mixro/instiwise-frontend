import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },

        //CONNECT USER
        connectWithAnotherUser: (state, action) => {
            const userIndex = state.users.findIndex((item) => item._id === action.payload.anotherUserId)
            if (userIndex !== -1) {
                const userToBeConnected = state.users[userIndex];
                const currentUserIdIndex = userToBeConnected.connections.indexOf(action.payload.currentUserId);

                if (currentUserIdIndex === -1) {
                    userToBeConnected.connections.push(action.payload.currentUserId);
                } else {
                    userToBeConnected.connections.splice(currentUserIdIndex, 1);
                }
            }   
        },
    }
});

export const {
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
    connectWithAnotherUser,
} = usersSlice.actions;

export default usersSlice.reducer;