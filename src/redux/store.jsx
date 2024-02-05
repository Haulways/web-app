import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slice/usersSlice";
import postsSlice from "./slice/postsSlice";
import likesSlice from "./slice/likesSlice";


const rootReducer = combineReducers({
  user: usersSlice,
  post: postsSlice,
  like: likesSlice,

});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;