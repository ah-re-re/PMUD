import { PropsItems } from "@/component/Items";
import { TypeCategory } from "@/page/Admin/componentsAdmin/Category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
    dataAdminHome: Array<TypeCategory>;
};

const initialState: appState = {
    dataAdminHome: [],
};

export const homeAdminStateSlice = createSlice({
    name: "homeState",
    initialState,
    reducers: {
        setDataAdminHome: (state, action: PayloadAction<TypeCategory[]>) => {
            state.dataAdminHome = action.payload;
        },
        addDataAdminHome: (state, action: PayloadAction<TypeCategory>) => {
            state.dataAdminHome.push(action.payload)
        },
    }
});

export const {
    setDataAdminHome,
    addDataAdminHome
} = homeAdminStateSlice.actions;

export default homeAdminStateSlice.reducer;