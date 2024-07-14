import { PropsItems } from "@/component/Items";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
    dataAbout: PropsItems[];
};

const initialState: appState = {
    dataAbout: [],
};

export const aboutStateSlice = createSlice({
    name: "aboutState",
    initialState,
    reducers: {
        setDataAbout: (state, action: PayloadAction<PropsItems[]>) => {
            state.dataAbout = action.payload;
        },
    }
});

export const {
    setDataAbout
} = aboutStateSlice.actions;

export default aboutStateSlice.reducer;