import { createSlice } from "@reduxjs/toolkit";

export const ongoingLessonSlice = createSlice({
    name: "ongoingLessons",
    initialState: {
        ongoingLessons: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getOngoingLessonsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOngoingLessonsSuccess: (state, action) => {
            state.isFetching = false;
            state.ongoingLessons = action.payload;
        },
        getOngoingLessonsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getOngoingLessonsFailure,
    getOngoingLessonsStart,
    getOngoingLessonsSuccess,
} = ongoingLessonSlice.actions;

export default ongoingLessonSlice.reducer;