import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    retrieveUser: (_, action) => {
      console.log(action.payload, "retrieve user");
      return action.payload;
    },
  },
});

export const { retrieveUser } = userSlice.actions;

export default userSlice.reducer;
