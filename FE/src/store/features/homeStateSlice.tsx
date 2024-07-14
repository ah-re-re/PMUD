import { PropsItems } from "@/component/Items";
import { TypeCategory } from "@/page/Admin/componentsAdmin/Category";
import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type appState = {
    dataHome: Array<TypeCategory>;
    dataProductHome: Array<TypeProduct>;
};

const initialState: appState = {
    dataHome: [],
    dataProductHome: [],
};

export const appStateSlice = createSlice({
    name: "homeState",
    initialState,
    reducers: {
        setDataHome: (state, action: PayloadAction<Array<TypeCategory>>) => {
            state.dataHome = action.payload;
        },
        setDataProductHome: (state, action: PayloadAction<Array<TypeProduct>| any>) => {
            state.dataProductHome = action.payload;
        },
    }
});

export const {
    setDataHome,
    setDataProductHome
} = appStateSlice.actions;

export default appStateSlice.reducer;