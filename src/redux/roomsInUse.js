import { createSlice } from "@reduxjs/toolkit";

export const inUseRoomSlice = createSlice({
    name: "inUseRooms",
    initialState: {
        inUseRooms: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getInUseRoomsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getInUseRoomsSuccess: (state, action) => {
            state.isFetching = false;
            state.inUseRooms = action.payload;
        },
        getInUseRoomsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getInUseRoomsFailure,
    getInUseRoomsStart,
    getInUseRoomsSuccess,
} = inUseRoomSlice.actions;

export default inUseRoomSlice.reducer;