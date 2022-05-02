import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const repoTypes = {
  FETCH_REPOS: "FETCH_REPOS",
  FETCH_REPO: "FETCH_REPO",
};

const repoSlice = createSlice({
  name: "repos",
  initialState,
  extraReducers: {
    [repoTypes.FETCH_REPOS]: (state, action) => {
      return action.payload;
    },
    [repoTypes.FETCH_REPO]: (state, action) => {
      return state.filter((repo) => repo.name.includes(action.payload));
    },
  },
});

export { repoTypes };
export default repoSlice.reducer;
