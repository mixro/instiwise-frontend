import { publicRequest, userRequest } from "../requestMethod";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "./coursesRedux";
import { getFreeRoomsFailure, getFreeRoomsStart, getFreeRoomsSuccess } from "./freeRooms";
import { getLessonsFailure, getLessonsStart, getLessonsSuccess } from "./lessonsRedux";
import { getOngoingCoursesFailure, getOngoingCoursesStart, getOngoingCoursesSuccess } from "./ongoingCourses";
import { getOngoingLessonsFailure, getOngoingLessonsStart, getOngoingLessonsSuccess } from "./ongoingLessons";
import { addPostFailure, addPostStart, addPostSuccess, deletePostFailure, deletePostStart, deletePostSuccess, dislikePost, getPostFailure, getPostStart, getPostSuccess, likePost, updatePostFailure, updatePostStart, updatePostSuccess, viewPost } from "./postsRedux";
import { getInUseRoomsFailure, getInUseRoomsStart, getInUseRoomsSuccess } from "./roomsInUse";
import { getRoomsFailure, getRoomsStart, getRoomsSuccess } from "./roomsRedux";
import { getTodaysLessonsFailure, getTodaysLessonsStart, getTodaysLessonsSuccess } from "./todaysLessons";
import { getUpcomingLessonsFailure, getUpcomingLessonsStart, getUpcomingLessonsSuccess } from "./upcomingLessons";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, googleLoginFailure, googleLoginStart, googleLoginSuccess, loginFailure, loginStart, loginSuccess, logout, registerStart, registerSuccess, regiterError, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";


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

//GOOGLE AUTH
export const googleLogin = async (dispatch, user, navigate) => {
  dispatch(googleLoginStart());
  try {
    const res = await publicRequest.post("/auth/google", user);
    dispatch(googleLoginSuccess(res.data));
    navigate('/');
  } catch(error) {
    dispatch(googleLoginFailure());
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
export const getRooms = async (dispatch, data) => {
    dispatch(getRoomsStart());
    try {
      dispatch(getRoomsSuccess(data));
    } catch(err) {
      dispatch(getRoomsFailure());
    }
}

//LESSONS
export const getLessons = async (dispatch, data) => {
    dispatch(getLessonsStart());
    try {
      dispatch(getLessonsSuccess(data));
    } catch(err) {
      dispatch(getLessonsFailure());
    }
}

//COURSES
export const getCourses = async (dispatch, data) => {
    dispatch(getCoursesStart());
    try {
      dispatch(getCoursesSuccess(data));
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

//UPCOMING LESSONS
export const getTodaysLessons = async (dispatch, data) => {
  dispatch(getTodaysLessonsStart());
  try {
    dispatch(getTodaysLessonsSuccess(data));
  } catch(err) {
    dispatch(getTodaysLessonsFailure());
  }
}

//POSTS
export const getPosts = async (dispatch, data) => {
  dispatch(getPostStart());
  try {
    dispatch(getPostSuccess(data));
  } catch(err) {
    dispatch(getPostFailure());
  }
}

export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    console.log(id);
    await userRequest.delete(`/posts/${id}`);
    dispatch(deletePostSuccess(id));
  } catch(err) {
    dispatch(deletePostFailure());
  }
}

export const updatePost = async (id, dispatch, post) => {
  dispatch(updatePostStart());
  try {
    const res = await userRequest.put(`/posts/${id}`, post);
    const updatedPost = res.data;
    dispatch(updatePostSuccess({id, updatedPost }));
  } catch(err) {
    dispatch(updatePostFailure());
  }
}

export const addPost = async (post, dispatch) => {
  dispatch(addPostStart());
  try {
    const res = await userRequest.post(`/posts`, post);
    dispatch(addPostSuccess(res.data));
  } catch(err) {
    dispatch(addPostFailure());
  }
}

//LIKE POST
export const addLike = async (userId, postId, dispatch) => {
  try {
      dispatch(likePost({ userId, postId })); 
      await userRequest.put(`/posts/${postId}/like`);
  } catch (err) {
      console.log(err);
  }
};

//DISLIKE POST
export const addDislike = async (userId, postId, dispatch) => {
  try {
      dispatch(dislikePost({ userId, postId })); 
      await userRequest.put(`/posts/${postId}/dislike`);
  } catch (err) {
      console.log(err);
  }
};

//VIEW POST
export const addView = async (userId, postId, dispatch) => {
  try {
    dispatch(viewPost({userId, postId}));
    await userRequest.post(`/posts/${postId}/view`);
  } catch (err) {
    console.log(err);
  }
};