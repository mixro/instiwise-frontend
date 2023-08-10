import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
    name: "instiwiseUsers",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //DELETE
        deleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
            );
        },
        deleteUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updateUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users[state.users.findIndex((item) => item._id === action.payload._id)] = action.payload.user; 
        },
        updateUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //ADD
        addUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //CLEAR
        clearUsers: (state) => {
            state.users = [];
            state.isFetching = false;
            state.error = false;
        }
    }
});

export const { 
    getUsersFailure, 
    getUsersStart, 
    getUsersSuccess, 
    deleteUsersFailure, 
    deleteUsersStart, 
    deleteUsersSuccess,
    updateUsersFailure, 
    updateUsersStart, 
    updateUsersSuccess,
    addUsersFailure, 
    addUsersStart, 
    addUsersSuccess,
    clearUsers
} = usersSlice.actions;

export default usersSlice.reducer;
