import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CredentialsState {
  oauth: string;
  code: string;
  refresh_token: string;
}

const initialState: CredentialsState = {
  oauth: "",
  code: "",
  refresh_token: "",
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    addOauth: (state, action) => {
      state.oauth = action.payload;
    },
    addCode: (state, action) => {
      state.code = action.payload;
    },
    addRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOauth, addCode, addRefreshToken } = credentialsSlice.actions;
export const credentials = (state: RootState) => state.credentials;
export default credentialsSlice.reducer;
