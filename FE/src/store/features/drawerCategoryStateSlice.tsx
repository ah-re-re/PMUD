import { TypeCategory, typeDes, typeName } from "@/page/Admin/componentsAdmin/Category";
import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type appAdminState = {
    categoryID: string;
    name: typeName[],
    des: typeDes[],
    parentId: string,
    url: string;
    type: string;
};

const initialState: appAdminState = {
    categoryID: '',
    name: [{ name: '', language: 'vi' }, { name: '', language: 'en' }],
    des: [{ des: '', language: 'vi' }, { des: '', language: 'en' }],
    parentId: '',
    url: '',
    type: 'C',
};

export const appAdminStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setCategoryID: (state, action: PayloadAction<string>) => {
            state.categoryID = action.payload
        },
        setCategory: (state, action: PayloadAction<TypeCategory>) => {
            state.name = action.payload.name
            state.des = action.payload.description
            state.url = action.payload.url
            state.categoryID = action.payload._id
            state.parentId = action.payload.parent_id
            state.type = "U"
        },
        setURL(state, action: PayloadAction<string>) {
            state.url = action.payload
        },
        clearCategory: (state) => {
            state.name = initialState.name
            state.des = initialState.des
            state.url = initialState.url
            state.type = "C"
        },
        setParentCategoryID: (state, action: PayloadAction<string>) => {
            state.parentId = action.payload
        },
        setName(state, action: PayloadAction<typeName>) {
            if (action.payload.language == 'vn') {
                state.name[0] = action.payload
                state.name = [...state.name]
            }
            else {
                state.name[1] = action.payload
            }
        },
        setDes(state, action: PayloadAction<typeDes>) {
            if (action.payload.language == 'vn') {
                state.des[0] = action.payload
            }
            else {
                state.des[1] = action.payload
            }
        }
    }
});

export const {
    setCategory,
    setCategoryID,
    setParentCategoryID,
    clearCategory,
    setURL,
    setName, setDes
} = appAdminStateSlice.actions;

export default appAdminStateSlice.reducer;