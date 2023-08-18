import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    retrieveUser: (_, action) => {
      // console.log(action.payload, "retrieve user");
      return action.payload;
    },
    updateUser: (_, action) => {
      return action.payload;
    },
  },
});

export const { retrieveUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
