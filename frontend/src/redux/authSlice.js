// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     suggestedUsers: [],
//     userProfile: null,
//   },
//   reducers: {
//     //actions
//     setAuthUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setSuggestedUsers: (state, action) => {
//       state.suggestedUsers = action.payload;
//     },
//     setUserProfile:(state, action) =>{
//       state.userProfile = action.payload;
//     }
//   },
// });

// export const { setAuthUser, setSuggestedUsers, setUserProfile } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSelectedPost } from "./postSlice";

export const fetchSuggestedUsers = createAsyncThunk(
  "auth/fetchSuggestedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/suggested-users");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch suggested users");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestedUsers = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAuthUser, setSuggestedUsers, setUserProfile, setSelectedUser } =
  authSlice.actions;
export default authSlice.reducer;
