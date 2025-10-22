import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name: "courses",
    initialState: {
        courses: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getCoursesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getCoursesSuccess: (state, action) => {
            state.isFetching = false;
            state.courses = action.payload;
        },
        getCoursesFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getCoursesFailure,
    getCoursesStart,
    getCoursesSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;