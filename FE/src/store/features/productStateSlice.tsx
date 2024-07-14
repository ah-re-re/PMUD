import { PropsItems } from "@/component/Items";
import { TypeCategory } from "@/page/Admin/componentsAdmin/Category";
import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type appState = {
    dataProduct: Array<TypeCategory>;
    dataProductProduct: Array<TypeProduct>;
};

const initialState: appState = {
    dataProduct: [],
    dataProductProduct: [],
};

export const appStateSlice = createSlice({
    name: "productState",
    initialState,
    reducers: {
        setDataProduct: (state, action: PayloadAction<Array<TypeCategory>>) => {
            state.dataProduct = action.payload;
        },
        setDataProductProduct: (state, action: PayloadAction<Array<TypeProduct>|any>) => {
            state.dataProductProduct = action.payload;
        },
    }
});

export const {
    setDataProduct,
    setDataProductProduct
} = appStateSlice.actions;

export default appStateSlice.reducer;