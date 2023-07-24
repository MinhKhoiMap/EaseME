import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tags",
  initialState: [],
  reducers: {
    retrieveTags: (_, action) => {
      return action.payload;
    },
  },
});

export const { retrieveTags } = tagSlice.actions;

export default tagSlice.reducer;
