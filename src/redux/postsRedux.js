import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET
        getPostStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getPostSuccess: (state, action) => {
            state.isFetching = false;
            state.posts = action.payload;
        },
        getPostFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },

        //DELETE
        deletePostStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deletePostSuccess: (state, action) => {
            state.isFetching = false;
            state.posts.splice(
                state.posts.findIndex((item) => item._id === action.payload),
            );
        },
        deletePostFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updatePostStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updatePostSuccess: (state, action) => {
            state.isFetching = false;
            state.posts[state.posts.findIndex((item) => item._id === action.payload._id)] = action.payload.post; 
        },
        updatePostFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //ADD
        addPostStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addPostSuccess: (state, action) => {
            state.isFetching = false;
            state.posts.push(action.payload);
        },
        addPostFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //CLEAR
        clearPosts: (state) => {
            state.posts = [];
            state.isFetching = false;
            state.error = false;
        }
    }
});

export const {
    getPostStart,
    getPostFailure,
    getPostSuccess,
    deletePostFailure,
    deletePostSuccess,
    deletePostStart,
    updatePostFailure,
    updatePostStart,
    updatePostSuccess,
    addPostFailure,
    addPostSuccess,
    addPostStart,
    clearPosts
} = postSlice.actions;

export default postSlice.reducer;