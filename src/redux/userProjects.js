import { createSlice } from "@reduxjs/toolkit";

export const userProjectsSlice = createSlice({
    name: "userProjects",
    initialState: {
        projects: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getUserProjectsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserProjectsSuccess: (state, action) => {
            state.isFetching = false;
            state.projects = action.payload;
        },
        getUserProjectsFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },

        
        // LIKE
        likeUserProject: (state, action) => {
            const projectIndex = state.projects.findIndex((item) => item._id === action.payload.projectId);
            if (projectIndex !== -1) {
                const project = state.projects[projectIndex];
                const userIdIndex = project.likes.indexOf(action.payload.userId);

                if (userIdIndex === -1) {
                    // User hasn't liked the post, so push userId into likes array
                    project.likes.push(action.payload.userId);
                } else {
                    // User has already liked the post, so remove userId from likes array
                    project.likes.splice(userIdIndex, 1);
                }
            }
        },
    }
});

export const {
    getUserProjectsFailure,
    getUserProjectsStart,
    getUserProjectsSuccess,
    likeUserProject,
} = userProjectsSlice.actions;

export default userProjectsSlice.reducer;