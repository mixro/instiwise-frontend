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
        },

        // LIKE
        likePost: (state, action) => {
            const postIndex = state.posts.findIndex((item) => item._id === action.payload.postId);
            if (postIndex !== -1) {
                const post = state.posts[postIndex];
                const userIdIndex = post.likes.indexOf(action.payload.userId);

                if (userIdIndex === -1) {
                    // User hasn't liked the post, so push userId into likes array
                    post.likes.push(action.payload.userId);
                } else {
                    // User has already liked the post, so remove userId from likes array
                    post.likes.splice(userIdIndex, 1);
                }

                // Remove userId from dislikes array if it exists
                const userIdInDislikes = post.dislikes.indexOf(action.payload.userId);
                if (userIdInDislikes !== -1) {
                    post.dislikes.splice(userIdInDislikes, 1);
                }
            }
        },

        // DISLIKE
        dislikePost: (state, action) => {
            const postIndex = state.posts.findIndex((item) => item._id === action.payload.postId);
            if (postIndex !== -1) {
                const post = state.posts[postIndex];
                const userIdIndex = post.dislikes.indexOf(action.payload.userId);

                if (userIdIndex === -1) {
                    // User hasn't disliked the post, so push userId into dislikes array
                    post.dislikes.push(action.payload.userId);
                } else {
                    // User has already disliked the post, so remove userId from dislikes array
                    post.dislikes.splice(userIdIndex, 1);
                }

                // Remove userId from likes array if it exists
                const userIdInLikes = post.likes.indexOf(action.payload.userId);
                if (userIdInLikes !== -1) {
                    post.likes.splice(userIdInLikes, 1);
                }
            }
        },
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
    clearPosts,
    likePost,
    dislikePost
} = postSlice.actions;

export default postSlice.reducer;