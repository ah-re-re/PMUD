import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type appAdminState = {
  appAdminState: string;
  drawerCategory: boolean;
  drawerProduct: boolean;
  reload: boolean
};

const initialState: appAdminState = {
  appAdminState: "home",
  drawerCategory: false,
  drawerProduct: false,
  reload: true
};

export const appAdminStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppAdminState: (state, action: PayloadAction<string>) => {
      state.appAdminState = action.payload;
    },
    openDrawerCategory: (state) => {
      state.drawerCategory = true
    },
    openDrawerProduct: (state) => {
      state.drawerProduct = true
    },
    closeDrawerCategory: (state) => {
      state.drawerCategory = false
    },
    closeDrawerProduct: (state) => {
      state.drawerProduct = false
    },
    setReload: (state) => {
      state.reload = !state.reload
    },

  }
});

export const {
  setAppAdminState,
  openDrawerCategory,
  openDrawerProduct,
  closeDrawerCategory,
  closeDrawerProduct,
  setReload,
} = appAdminStateSlice.actions;

export default appAdminStateSlice.reducer;