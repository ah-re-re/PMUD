import { PropsItems } from "@/component/Items";
import { TypeCategory } from "@/page/Admin/componentsAdmin/Category";
import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type appState = {
    dataCase: Array<TypeCategory>;
    dataProductCase: Array<TypeProduct>;
};

const initialState: appState = {
    dataCase: [],
    dataProductCase: [],
};

export const appStateSlice = createSlice({
    name: "caseState",
    initialState,
    reducers: {
        setDataCase: (state, action: PayloadAction<Array<TypeCategory>>) => {
            state.dataCase = action.payload;
        },
        setDataProductCase: (state, action: PayloadAction<Array<TypeProduct> | any>) => {
            state.dataProductCase = action.payload;
        },
    }
});

export const {
    setDataCase,
    setDataProductCase
} = appStateSlice.actions;

export default appStateSlice.reducer;