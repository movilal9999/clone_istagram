// import { createSlice } from "@reduxjs/toolkit";

// const postSlice = createSlice({
//   name: "post",
//   initialState: {
//     posts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setPosts: (state, action) => {
//       state.posts = action.payload;
//     },
//   },
// });

// export const { setPosts } = postSlice.actions;
// export default postSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const postSlice = createSlice({
//   name: "post",
//   initialState: {
//     posts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setPosts: (state, action) => {
//       console.log("Setting posts in Redux:", action.payload); // Debug log
//       state.posts = action.payload;
//     },
//   },
// });

// export const { setPosts } = postSlice.actions;
// export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    selectedPost:null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setSelectedPost:(state, action)=>{
      state.selectedPost = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setPosts, setLoading, setSelectedPost, selectedPost } = postSlice.actions;
export default postSlice.reducer;
