import { createSlice } from "@reduxjs/toolkit";

export const lessonSlice = createSlice({
    name: "lessons",
    initialState: {
        lessons: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getLessonsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getLessonsSuccess: (state, action) => {
            state.isFetching = false;
            state.lessons = action.payload;
        },
        getLessonsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getLessonsFailure,
    getLessonsStart,
    getLessonsSuccess,
} = lessonSlice.actions;

export default lessonSlice.reducer;