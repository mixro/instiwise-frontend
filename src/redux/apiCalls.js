import { publicRequest, userRequest } from "../requestMethod";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "./coursesRedux";
import { getFreeRoomsFailure, getFreeRoomsStart, getFreeRoomsSuccess } from "./freeRooms";
import { getLessonsFailure, getLessonsStart, getLessonsSuccess } from "./lessonsRedux";
import { getOngoingCoursesFailure, getOngoingCoursesStart, getOngoingCoursesSuccess } from "./ongoingCourses";
import { getOngoingLessonsFailure, getOngoingLessonsStart, getOngoingLessonsSuccess } from "./ongoingLessons";
import { getInUseRoomsFailure, getInUseRoomsStart, getInUseRoomsSuccess } from "./roomsInUse";
import { getRoomsFailure, getRoomsStart, getRoomsSuccess } from "./roomsRedux";
import { getUpcomingLessonsFailure, getUpcomingLessonsStart, getUpcomingLessonsSuccess } from "./upcomingLessons";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, loginFailure, loginStart, loginSuccess, logout, registerStart, registerSuccess, regiterError, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";


// USER  LOGIN
export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (err) {
    dispatch(loginFailure());
  }
};

// USER REGISTER
export const userRegister = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate('/');
  } catch(err) {
    dispatch(regiterError());
  }
}

// UPDATE USER
export const updateUser = async (id, dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    const updatedUser = res.data;
    dispatch(updateUserSuccess(updatedUser));
  } catch(err) {
    dispatch(updateUserFailure());
  }
}

//DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess());
  } catch(err) {
    dispatch(deleteUserFailure());
  }
}

// USER  LOGOUT
export const UserLogout = async (dispatch) => {
  dispatch(logout());
};

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