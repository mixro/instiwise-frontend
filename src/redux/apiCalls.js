import { publicRequest, userRequest } from "../requestMethod";
import { getCoursesFailure, getCoursesStart, getCoursesSuccess } from "./coursesRedux";
import { getUsernameFailure, getUsernameRoomsStart, getUsernameSuccess } from "./existingUsernames";
import { getFreeRoomsFailure, getFreeRoomsStart, getFreeRoomsSuccess } from "./freeRooms";
import { getLessonsFailure, getLessonsStart, getLessonsSuccess } from "./lessonsRedux";
import { getOngoingCoursesFailure, getOngoingCoursesStart, getOngoingCoursesSuccess } from "./ongoingCourses";
import { getOngoingLessonsFailure, getOngoingLessonsStart, getOngoingLessonsSuccess } from "./ongoingLessons";
import { addPostFailure, addPostStart, addPostSuccess, deletePostFailure, deletePostStart, deletePostSuccess, dislikePost, getPostFailure, getPostStart, getPostSuccess, likePost, updatePostFailure, updatePostStart, updatePostSuccess, viewPost } from "./postsRedux";
import { addProjectFailure, addProjectStart, addProjectSuccess, deleteProjectFailure, deleteProjectStart, deleteProjectSuccess, getProjectFailure, getProjectStart, getProjectSuccess, likeProject, updateProjectFailure, updateProjectStart, updateProjectSuccess } from "./projectsRedux";
import { getInUseRoomsFailure, getInUseRoomsStart, getInUseRoomsSuccess } from "./roomsInUse";
import { getRoomsFailure, getRoomsStart, getRoomsSuccess } from "./roomsRedux";
import { clearUser, connectWithUser, connectWithUsersConnections, getUserFailure, getUserStart, getUserSuccess, likeSearchedUserProjects } from "./searchedUser";
import { getTodaysLessonsFailure, getTodaysLessonsStart, getTodaysLessonsSuccess } from "./todaysLessons";
import { getUpcomingLessonsFailure, getUpcomingLessonsStart, getUpcomingLessonsSuccess } from "./upcomingLessons";
import { getUserProjectsFailure, getUserProjectsStart, getUserProjectsSuccess, likeUserProject } from "./userProjects";
import { connectWithCurrentUserConnection, deleteUserFailure, deleteUserStart, deleteUserSuccess, getCurrentUserFailure, getCurrentUserStart, getCurrentUserSuccess, googleLoginFailure, googleLoginStart, googleLoginSuccess, googleRegisterFailure, googleRegisterStart, googleRegisterSuccess, loginFailure, loginStart, loginSuccess, logout, registerStart, registerSuccess, regiterError, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { connectWithAnotherUser, getUsersFailure, getUsersStart, getUsersSuccess } from "./usersRedux";


// USER  LOGIN
export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate('/');
    window.location.reload();
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
    window.location.reload();
  } catch(err) {
    dispatch(regiterError());
  }
}

//GOOGLE LOGIN
export const googleLogin = async (dispatch, user, navigate) => {
  dispatch(googleLoginStart());
  try {
    const res = await publicRequest.post("/auth/google-login", user);
    dispatch(googleLoginSuccess(res.data));
    navigate('/');
    window.location.reload();
  } catch(error) {
    dispatch(googleLoginFailure());
  }
}

//GOOGLE REGISTER
export const googleRegister = async (dispatch, user, navigate) => {
  dispatch(googleRegisterStart());
  try {
    const res = await publicRequest.post("/auth/google-register", user);
    dispatch(googleRegisterSuccess(res.data));
    navigate('/set-username');
    window.location.reload();
  } catch(error) {
    dispatch(googleRegisterFailure());
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

// UPDATE USERNAME
export const updateUsername = async (id, dispatch, user, navigate) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    const updatedUser = res.data;
    dispatch(updateUserSuccess(updatedUser));
    navigate('/');
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

//GET CURRENT USER
export const searchCurrentUser = async (userId, dispatch) => {
  dispatch(getCurrentUserStart());
  try {
    const foundUser = await userRequest.get(`/users/find/${userId}`);
    dispatch(getCurrentUserSuccess(foundUser.data));
  } catch(err) {
    dispatch(getCurrentUserFailure());
  }
}

//SEARCHED USER
export const searchUser = async (searchedUserId, dispatch) => {
  dispatch(clearUser());
  dispatch(getUserStart());
  try {
    const foundUser = await userRequest.get(`/users/find/${searchedUserId}`);
    dispatch(getUserSuccess(foundUser.data));
  } catch(err) {
    dispatch(getUserFailure());
  }
}

//CONNECT WITH SEARCHED USER
export const connectWithSearchedUser = async (currentUser, searchedUserId, dispatch) => {
  try {
      dispatch(connectWithUser({ currentUser })); 
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


//CONNECT USER FROM SEARCHED USER CONNECTIONS
export const connectWithCurrentUsersConnection = async (currentUserId, otherUserId, dispatch) => {
  try {
      dispatch(connectWithCurrentUserConnection({ currentUserId,  otherUserId})); 
      await userRequest.put(`/users/${otherUserId}/connect`);
  } catch (err) {
      console.log(err);
  }
};


//CONNECT USER FROM SEARCHED USER CONNECTIONS
export const connectWithUsersConnection = async (currentUserId, otherUserId, dispatch) => {
  try {
      dispatch(connectWithUsersConnections({ currentUserId,  otherUserId})); 
      await userRequest.put(`/users/${otherUserId}/connect`);
  } catch (err) {
      console.log(err);
  }
};


//CONNECT USER FROM SEARCHED USER CONNECTIONS
export const fetchUsernames = async (dispatch) => {
  dispatch(getUsernameRoomsStart());
  try {
      const res = await publicRequest.get(`/users/existing-usernames`);
      dispatch(getUsernameSuccess(res.data));
  } catch (err) {
      dispatch(getUsernameFailure());
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

export const deleteProject = async (projectId, dispatch) => {
  dispatch(deleteProjectStart());
  try {
    await userRequest.delete(`/projects/${projectId}`);
    dispatch(deleteProjectSuccess(projectId));
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

//LIKE SEARCHED USER PROJECTS
export const AddlikeForSearchedUserProject = async (currentUserId, projectId, dispatch) => {
  try {
      console.log(currentUserId);
      dispatch(likeSearchedUserProjects({ currentUserId, projectId })); 
      await userRequest.put(`/projects/${projectId}/like`);
  } catch (err) {
      console.log(err);
  }
};