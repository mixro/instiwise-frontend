import { createSlice } from "@reduxjs/toolkit";

export const ongoingCourseSlice = createSlice({
    name: "ongoingCourses",
    initialState: {
        ongoingCourses: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getOngoingCoursesStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOngoingCoursesSuccess: (state, action) => {
            state.isFetching = false;
            state.ongoingCourses = action.payload;
        },
        getOngoingCoursesFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        }
    }
});

export const {
    getOngoingCoursesFailure,
    getOngoingCoursesStart,
    getOngoingCoursesSuccess,
} = ongoingCourseSlice.actions;

export default ongoingCourseSlice.reducer;