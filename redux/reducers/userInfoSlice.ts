import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  userData: {
    username: string;
    id: string;
  };
  channelData: {
    view_count: number;
    follower_count: number;
  };
}

const initialState: UserState = {
  userData: {
    username: "",
    id: "",
  },
  channelData: {
    view_count: 0,
    follower_count: 0,
  },
};

export const menuSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData.username = action.payload.username;
      state.userData.id = action.payload.id;
      state.channelData.view_count = action.payload.view_count;
      state.channelData.follower_count = action.payload.follower_count;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = menuSlice.actions;
export default menuSlice.reducer;
