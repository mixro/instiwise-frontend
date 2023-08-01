import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getRoomsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getRoomsSuccess: (state, action) => {
            state.isFetching = false;
            state.rooms = action.payload;
        },
        getRoomsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getRoomsFailure,
    getRoomsStart,
    getRoomsSuccess,
} = roomSlice.actions;

export default roomSlice.reducer;