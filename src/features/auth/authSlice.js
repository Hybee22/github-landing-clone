import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  proxy_url: process.env.REACT_APP_PROXY_URL,
};

const authTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authTypes.LOGIN]: (state, action) => {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    },
    [authTypes.LOGOUT]: (state) => {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    },
  },
});

export { authTypes };
export default authSlice.reducer;
