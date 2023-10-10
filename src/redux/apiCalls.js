import { publicRequest, userRequest } from "../requestMethod";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "./coursesRedux";
import { getFreeRoomsFailure, getFreeRoomsStart, getFreeRoomsSuccess } from "./freeRooms";
import { getLessonsFailure, getLessonsStart, getLessonsSuccess } from "./lessonsRedux";
import { getOngoingCoursesFailure, getOngoingCoursesStart, getOngoingCoursesSuccess } from "./ongoingCourses";
import { getOngoingLessonsFailure, getOngoingLessonsStart, getOngoingLessonsSuccess } from "./ongoingLessons";
import { addPostFailure, addPostStart, addPostSuccess, deletePostFailure, deletePostStart, deletePostSuccess, dislikePost, getPostFailure, getPostStart, getPostSuccess, likePost, updatePostFailure, updatePostStart, updatePostSuccess, viewPost } from "./postsRedux";
import { addProjectFailure, addProjectStart, addProjectSuccess, deleteProjectFailure, deleteProjectStart, deleteProjectSuccess, getProjectFailure, getProjectStart, getProjectSuccess, likeProject, updateProjectFailure, updateProjectStart, updateProjectSuccess } from "./projectsRedux";
import { getInUseRoomsFailure, getInUseRoomsStart, getInUseRoomsSuccess } from "./roomsInUse";
import { getRoomsFailure, getRoomsStart, getRoomsSuccess } from "./roomsRedux";
import { clearUser, connectWithUser, getUserFailure, getUserStart, getUserSuccess } from "./searchedUser";
import { getSearchedUserProjectsFailure, getSearchedUserProjectsStart, getSearchedUserProjectsSuccess, likeSearchedUserProject } from "./searchedUserProjects";
import { getTodaysLessonsFailure, getTodaysLessonsStart, getTodaysLessonsSuccess } from "./todaysLessons";
import { getUpcomingLessonsFailure, getUpcomingLessonsStart, getUpcomingLessonsSuccess } from "./upcomingLessons";
import { getUserProjectsFailure, getUserProjectsStart, getUserProjectsSuccess, likeUserProject } from "./userProjects";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, googleLoginFailure, googleLoginStart, googleLoginSuccess, loginFailure, loginStart, loginSuccess, logout, registerStart, registerSuccess, regiterError, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { connectWithAnotherUser, getUsersFailure, getUsersStart, getUsersSuccess } from "./usersRedux";


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

export const ClearSearchedUser = async (dispatch) => {
  dispatch(clearUser());
};

// GET CURRENT USER PROJECTS
export const getUserProjects = async (userId, dispatch) => {
  dispatch(getUserProjectsStart());
    try {
      const res = await userRequest.get(`/projects/user/${userId}`);
      dispatch(getUserProjectsSuccess(res.data));
    } catch(err) {
      dispatch(getUserProjectsFailure());
    }
}

//USERS
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await userRequest.get("/users");
      dispatch(getUsersSuccess(res.data));
    } catch(err) {
      dispatch(getUsersFailure());
    }
}

//SEARCHED USER
export const searchUser = async (searchedUserId, dispatch) => {
  dispatch(getUserStart());
  try {
    const foundUser = await userRequest.get(`/users/find/${searchedUserId}`);
    dispatch(getUserSuccess(foundUser.data));
  } catch(err) {
    dispatch(getUserFailure());
  }
}

// GET SEARCHED USER PROJECTS
export const getSearchedUserProjects = async (searchedUserId, dispatch) => {
  dispatch(getSearchedUserProjectsStart());
    try {
      const res = await userRequest.get(`/projects/user/${searchedUserId}`);
      dispatch(getSearchedUserProjectsSuccess(res.data));
    } catch(err) {
      dispatch(getSearchedUserProjectsFailure());
    }
}

//CONNECT WITH SEARCHED USER
export const connectWithSearchedUser = async (currentUserId, searchedUserId, dispatch) => {
  try {
      dispatch(connectWithUser({ currentUserId })); 
      await userRequest.put(`/users/${searchedUserId}/connect`);
  } catch (err) {
      console.log(err);
  }
};


//CONNECT WITH OTHER USER
export const connectWithOtherUser = async (currentUserId, anotherUserId, dispatch) => {
  try {
      dispatch(connectWithAnotherUser({ currentUserId,  anotherUserId})); 
      await userRequest.put(`/users/${anotherUserId}/connect`);
  } catch (err) {
      console.log(err);
  }
};




//--------------------------------------------- BASIC DATA-------------------------------------------------------


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



//--------------------------------------------- REAL TIME DATA-------------------------------------------------------

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



//---------------------------------------------POST SIDE-------------------------------------------------------

export const getPosts = async (dispatch) => {
  dispatch(getPostStart());
  try {
    const res = await userRequest.get("/posts");
    dispatch(getPostSuccess(res.data));
  } catch(err) {
    dispatch(getPostFailure());
  }
}

export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
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



//---------------------------------------------PROJECTS SIDE-------------------------------------------------------

export const getProjects = async (dispatch) => {
  dispatch(getProjectStart());
  try {
    const res = await publicRequest.get("/projects");
    dispatch(getProjectSuccess(res.data));
  } catch(err) {
    dispatch(getProjectFailure());
  }
}

export const deleteProject = async (id, dispatch) => {
  dispatch(deleteProjectStart());
  try {
    await userRequest.delete(`/projects/${id}`);
    dispatch(deleteProjectSuccess(id));
  } catch(err) {
    dispatch(deleteProjectFailure());
  }
}

export const updateProject = async (id, dispatch, project) => {
  dispatch(updateProjectStart());
  try {
    const res = await userRequest.put(`/projects/${id}`, project);
    const updatedProject = res.data;
    dispatch(updateProjectSuccess({id, updatedProject }));
  } catch(err) {
    dispatch(updateProjectFailure());
  }
}

export const addProject = async (project, dispatch) => {
  dispatch(addProjectStart());
  try {
    const res = await userRequest.post(`/projects`, project);
    dispatch(addProjectSuccess(res.data));
  } catch(err) {
    dispatch(addProjectFailure());
  }
}

//LIKE PROJECT
export const addlikeForProject = async (userId, projectId, dispatch) => {
  try {
      dispatch(likeProject({ userId, projectId })); 
      await userRequest.put(`/projects/${projectId}/like`);
  } catch (err) {
      console.log(err);
  }
};

//LIKE USER PROJECT
export const AddlikeForUserProject = async (userId, projectId, dispatch) => {
  try {
      dispatch(likeUserProject({ userId, projectId })); 
      await userRequest.put(`/projects/${projectId}/like`);
  } catch (err) {
      console.log(err);
  }
};

//LIKE USER PROJECT
export const AddlikeForSearchedUserProject = async (userId, projectId, dispatch) => {
  try {
      dispatch(likeSearchedUserProject({ userId, projectId })); 
      await userRequest.put(`/projects/${projectId}/like`);
  } catch (err) {
      console.log(err);
  }
};