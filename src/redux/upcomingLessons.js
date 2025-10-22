import { createSlice } from "@reduxjs/toolkit";

export const upcomingLessonSlice = createSlice({
  name: "upcomingLessons",
  initialState: {
      upcomingLessons: [],
      isFetching: false,
      error: false,
  },
  reducers: {
      getUpcomingLessonsStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      getUpcomingLessonsSuccess: (state, action) => {
          state.isFetching = false;
          state.upcomingLessons = action.payload;
      },
      getUpcomingLessonsFailure: (state) => {
          state.isFetching = true;
          state.error = true;
      }
  }
});

export const {
  getUpcomingLessonsFailure,
  getUpcomingLessonsStart,
  getUpcomingLessonsSuccess,
} = upcomingLessonSlice.actions;

export default upcomingLessonSlice.reducer;
