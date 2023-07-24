import { configureStore } from "@reduxjs/toolkit";
import postsListReducer from "./slices/postsListSlice";
import userProfileReducer from "./slices/userSlice";
import tagsReducer from "./slices/tagSlice";

const store = configureStore({
  reducer: {
    postsList: postsListReducer,
    userProfile: userProfileReducer,
    tags: tagsReducer,
  },
});

export default store;
