import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "postsList",
  initialState: [],
  reducers: {
    retrievePostsList: (_, action) => {
      console.log(action.payload, "retrievePostsList action");
      return action.payload;
    },
  },
});

export const { retrievePostsList } = postsSlice.actions;

export default postsSlice.reducer;
