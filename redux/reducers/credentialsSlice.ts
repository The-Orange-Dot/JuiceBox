import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CredentialsState {
  oauth: String | undefined;
}

const initialState: CredentialsState = {
  oauth: undefined,
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    addOauth: (state, action) => {
      state.oauth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOauth } = credentialsSlice.actions;
export const credentials = (state: RootState) => state.credentials;
export default credentialsSlice.reducer;
