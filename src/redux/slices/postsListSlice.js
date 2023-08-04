import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "postsList",
  initialState: [],
  reducers: {
    retrievePostsList: (_, action) => {
      console.log(action.payload, "retrievePostsList action");
      return action.payload;
    },
    addPost: (postsList, action) => {
      postsList.push(action.payload);
    },
    removePost: (postsList, action) => {
      return postsList.filter((post) => post._id !== action.payload);
    },
  },
});

export const { retrievePostsList, addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
