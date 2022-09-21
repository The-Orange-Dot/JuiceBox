import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface MenuState {
  open: Boolean;
}

const initialState: MenuState = {
  open: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.open = true;
    },
    closeMenu: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
