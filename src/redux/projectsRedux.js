import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET
        getProjectStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.projects = action.payload;
        },
        getProjectFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },

        //DELETE
        deleteProjectStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.projects.splice(
                state.projects.findIndex((item) => item._id === action.payload),
            );
        },
        deleteProjectFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updateProjectStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.projects[state.projects.findIndex((item) => item._id === action.payload._id)] = action.payload.project; 
        },
        updateProjectFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //ADD
        addProjectStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProjectSuccess: (state, action) => {
            state.isFetching = false;
            state.projects.push(action.payload);
        },
        addProjectFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //CLEAR
        clearProjects: (state) => {
            state.projects = [];
            state.isFetching = false;
            state.error = false;
        },

        // LIKE
        likeProject: (state, action) => {
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
    getProjectFailure,
    getProjectSuccess,
    getProjectStart,
    deleteProjectFailure,
    deleteProjectSuccess,
    deleteProjectStart,
    updateProjectFailure,
    updateProjectSuccess,
    updateProjectStart,
    addProjectFailure,
    addProjectSuccess,
    addProjectStart,
    clearProjects,
    likeProject,
} = projectSlice.actions;

export default projectSlice.reducer;