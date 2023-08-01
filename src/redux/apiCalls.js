import { publicRequest } from "../requestMethod";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "./coursesRedux";
import { getFreeRoomsFailure, getFreeRoomsStart, getFreeRoomsSuccess } from "./freeRooms";
import { getLessonsFailure, getLessonsStart, getLessonsSuccess } from "./lessonsRedux";
import { getOngoingCoursesFailure, getOngoingCoursesStart, getOngoingCoursesSuccess } from "./ongoingCourses";
import { getOngoingLessonsFailure, getOngoingLessonsStart, getOngoingLessonsSuccess } from "./ongoingLessons";
import { getInUseRoomsFailure, getInUseRoomsStart, getInUseRoomsSuccess } from "./roomsInUse";
import { getRoomsFailure, getRoomsStart, getRoomsSuccess } from "./roomsRedux";
import { getUpcomingLessonsFailure, getUpcomingLessonsStart, getUpcomingLessonsSuccess } from "./upcomingLessons";


//ROOMS
export const getRooms = async (dispatch) => {
    dispatch(getRoomsStart());
    try {
      const res = await publicRequest.get("/rooms");
      dispatch(getRoomsSuccess(res.data));
    } catch(err) {
      dispatch(getRoomsFailure());
    }
}

//LESSONS
export const getLessons = async (dispatch) => {
    dispatch(getLessonsStart());
    try {
      const res = await publicRequest.get("/lessons");
      dispatch(getLessonsSuccess(res.data));
    } catch(err) {
      dispatch(getLessonsFailure());
    }
}

//COURSES
export const getCourses = async (dispatch) => {
    dispatch(getCoursesStart());
    try {
      const res = await publicRequest.get("/courses");
      dispatch(getCoursesSuccess(res.data));
    } catch(err) {
      dispatch(getCoursesFailure());
    }
}

//FREE ROOMS
export const getFreeRooms = async (dispatch, data) => {
  dispatch(getFreeRoomsStart());
  try {
    dispatch(getFreeRoomsSuccess(data));
  } catch(err) {
    dispatch(getFreeRoomsFailure());
  }
}

//ROOMS IN USE
export const getInUseRooms = async (dispatch, data) => {
  dispatch(getInUseRoomsStart());
  try {
    dispatch(getInUseRoomsSuccess(data));
  } catch(err) {
    dispatch(getInUseRoomsFailure());
  }
}

//ONGOING COURSES 
export const getOngoingCourse = async (dispatch, data) => {
  dispatch(getOngoingCoursesStart());
  try {
    dispatch(getOngoingCoursesSuccess(data));
  } catch(err) {
    dispatch(getOngoingCoursesFailure());
  }
}

//ONGOING LESSONS
export const getOngoingLessons = async (dispatch, data) => {
  dispatch(getOngoingLessonsStart());
  try {
    dispatch(getOngoingLessonsSuccess(data));
  } catch(err) {
    dispatch(getOngoingLessonsFailure());
  }
}

//UPCOMING LESSONS
export const getUpcomingLessons = async (dispatch, data) => {
  dispatch(getUpcomingLessonsStart());
  try {
    dispatch(getUpcomingLessonsSuccess(data));
  } catch(err) {
    dispatch(getUpcomingLessonsFailure());
  }
}