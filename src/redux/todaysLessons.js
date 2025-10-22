import { createSlice } from "@reduxjs/toolkit";

export const todayLessonSlice = createSlice({
    name: "todaysLessons",
    initialState: {
        todaysLessons: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getTodaysLessonsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getTodaysLessonsSuccess: (state, action) => {
            state.isFetching = false;
            state.todaysLessons = action.payload;
        },
        getTodaysLessonsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getTodaysLessonsStart,
    getTodaysLessonsFailure,
    getTodaysLessonsSuccess
} = todayLessonSlice.actions;

export default todayLessonSlice.reducer;