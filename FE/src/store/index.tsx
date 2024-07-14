import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "@/store/features/appStateSlice";
import homeStateSlice from "./features/homeStateSlice";
import aboutStateSlice from "./features/aboutStateSlice";
import productStateSlice from "./features/productStateSlice";
import caseStateSlice from "./features/caseStateSlice";
import servicesStateSlice from "./features/servicesStateSlice";
import appAdminStateSlice from "./features/appAdminStateSlice";
import homeAdminStateSlice from "./features/homeAdminStateSlice";
import drawerCategoryStateSlice from "./features/drawerCategoryStateSlice";
import drawerProductStateSlice from "./features/drawerProductStateSlice";
import cartStateSlice from "./features/cartStateSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    homeState: homeStateSlice,
    aboutState: aboutStateSlice,
    productState: productStateSlice,
    caseState: caseStateSlice,
    servicesState: servicesStateSlice,
    appAdminState: appAdminStateSlice,
    homeAdminState: homeAdminStateSlice,
    drawerCategoryState: drawerCategoryStateSlice,
    drawerProductState: drawerProductStateSlice,
    cartState: cartStateSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;