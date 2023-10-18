import { createSlice } from "@reduxjs/toolkit";

export const existingUsernamesSlice = createSlice({
    name: "existingUsernames",
    initialState: {
        usernames: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getUsernameRoomsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsernameSuccess: (state, action) => {
            state.isFetching = false;
            state.usernames = action.payload;
        },
        getUsernameFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getUsernameRoomsStart,
    getUsernameFailure,
    getUsernameSuccess,
} = existingUsernamesSlice.actions;

export default existingUsernamesSlice.reducer;