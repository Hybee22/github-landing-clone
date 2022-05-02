import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import repoReducer from "./features/repo/repoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    repos: repoReducer,
  },
});
