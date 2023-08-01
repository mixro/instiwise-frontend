import { createSlice } from "@reduxjs/toolkit";

export const freeRoomSlice = createSlice({
    name: "freeRooms",
    initialState: {
        freeRooms: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getFreeRoomsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getFreeRoomsSuccess: (state, action) => {
            state.isFetching = false;
            state.freeRooms = action.payload;
        },
        getFreeRoomsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getFreeRoomsFailure,
    getFreeRoomsStart,
    getFreeRoomsSuccess,
} = freeRoomSlice.actions;

export default freeRoomSlice.reducer;