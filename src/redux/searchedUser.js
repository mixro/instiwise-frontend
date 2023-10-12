import { createSlice } from "@reduxjs/toolkit";

const searchedUserSlice = createSlice({
  name: "searchedUser",
  initialState: {
    searchedUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET USER
    getUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    getUserSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.searchedUser = action.payload;
    },
    getUserFailure: (state) => {
        state.error = true;
        state.isFetching = false;
    },

    //CONNECT USER
    connectWithUser: (state, action) => {
        const currentUser = action.payload.currentUser;

        // Check if the currentUser is already in the connections
        const isAlreadyConnected = state.searchedUser.connections.some(
            (user) => user._id === currentUser._id
        );

        // Create a copy of the searchedUser and update the connections array
        const updatedSearchedUser = { ...state.searchedUser };

        if (isAlreadyConnected) {
            // If the current user is already connected, disconnect
            updatedSearchedUser.connections = updatedSearchedUser.connections.filter(
                (user) => user._id !== currentUser._id
            );
        } else {
            // If the current user is not connected, connect
            updatedSearchedUser.connections.push(currentUser);
        }

        // Update the state with the modified searchedUser
        state.searchedUser = updatedSearchedUser;
    },

    //CONNECT WITH USERS CONNECTIONS
    connectWithUsersConnections: (state, action) => {
        const userIndex = state.searchedUser.connections.findIndex((item) => item._id === action.payload.otherUserId);
        if (userIndex !== -1) {
            const userToBeConnected = state.searchedUser.connections[userIndex];
            const currentUserIdIndex = userToBeConnected.connections.indexOf(action.payload.currentUserId);

            if (currentUserIdIndex === -1) {
                userToBeConnected.connections.push(action.payload.currentUserId);
            } else {
                userToBeConnected.connections.splice(currentUserIdIndex, 1);
            }
        }
    },

    //LIKE SEARCHED USER PROJECTS
    likeSearchedUserProjects: (state, action) => {
        const projectIndex = state.searchedUser.projects.findIndex((item) => item._id === action.payload.projectId);

        if(projectIndex !== -1) {
            const project = state.searchedUser.projects[projectIndex];
            const userIndex = project.likes.indexOf(action.payload.currentUserId);

            if (userIndex === -1) {
                project.likes.push(action.payload.currentUserId);
            } else {
                project.likes.splice(projectIndex, 1);
            }
        }
    },

    //LOGOUT
    clearUser: (state) => {
        state.searchedUser = null;
    },
  },
});

export const { 
    getUserFailure,
    getUserSuccess,
    getUserStart,
    connectWithUser,
    clearUser,
    connectWithUsersConnections,
    likeSearchedUserProjects
} = searchedUserSlice.actions;
export default searchedUserSlice.reducer;
