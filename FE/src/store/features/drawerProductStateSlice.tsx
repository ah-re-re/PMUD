import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type typeName = {
    name: string;
    language: string;
}

type typeDes = {
    des: string;
    language: string;
}

type typeImage = {
    name: typeName[]
    url: string;
    description: typeDes[]
}


type appAdminState = {
    parentID: string;
    productID: string;
    name: typeName[];
    price: number;
    images: typeImage[];
    discounts?: number;
    type: string;
    condition: string;
    size: string;
    weight: string;
    url: string;
    description: typeDes[];
};

const initialState: appAdminState = {
    name: [{ name: '', language: 'vi' }, { name: '', language: 'en' }],
    images: [{ name: [{ name: '', language: 'vi' }, { name: '', language: 'en' }], url: '', description: [{ des: '', language: 'vi' }, { des: '', language: 'en' }] }],
    description: [{ des: '', language: 'vi' }, { des: '', language: 'en' }],
    type: 'C',
    price: 0,
    parentID: "",
    productID: "",
    condition: "",
    size: "",
    weight: "",
    url: "",
};

type setImageURL = {
    key: number;
    url: string;
}

type setImageDes = {
    key: number;
    des: string;
    language: string;
}
type setImageName = {
    key: number;
    name: string;
    language: string;
}

export const appAdminStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setProductID: (state, action: PayloadAction<string>) => {
            state.productID = action.payload
        },
        setProduct: (state, action: PayloadAction<TypeProduct>) => {
            state.name = action.payload.name
            state.images = action.payload.images
            state.productID = action.payload._id
            state.price = action.payload.price;
            state.discounts = action.payload.discounts
            state.parentID = action.payload.category_id
            state.url = action.payload.url
            state.description = action.payload.description
            state.type = "U"
        },
        clearProduct: (state) => {
            state.type = "C"
        },
        setParentProductID: (state, action: PayloadAction<string>) => {
            state.parentID = action.payload
        },
        addImage: (state) => {
            state.images.push({ name: [{ name: '', language: 'vi' }, { name: '', language: 'en' }], url: '', description: [{ des: '', language: 'vi' }, { des: '', language: 'en' }] })
        },
        setImageUrl: (state, action: PayloadAction<setImageURL>) => {
            state.images[action.payload.key].url = action.payload.url
        },
        setImageDes(state, action: PayloadAction<setImageDes>) {
            if (action.payload.language == 'vn') {
                state.images[action.payload.key].description[0].des = action.payload.des
            }
            else {
                state.images[action.payload.key].description[1].des = action.payload.des
            }
        },
        setImageName(state, action: PayloadAction<setImageName>) {
            if (action.payload.language == 'vn') {
                state.images[action.payload.key].name[0].name = action.payload.name
            }
            else {
                state.images[action.payload.key].name[1].name = action.payload.name
            }
        },
        deleteImageName(state, action: PayloadAction<number>) {
            state.images.splice(action.payload, 1)
        }
        ,
        setNameProduct(state, action: PayloadAction<typeName>) {
            if (action.payload.language == 'vn') {
                state.name[0] = action.payload
            }
            else {
                state.name[1] = action.payload
            }
        },
        setDesProduct(state, action: PayloadAction<typeDes>) {
            if (action.payload.language == 'vn') {
                state.description[0] = action.payload
            }
            else {
                state.description[1] = action.payload
            }
        },
        setPrice(state, action: PayloadAction<number>) {
            state.price = action.payload
        },
        setDiscounts(state, action: PayloadAction<number>) {
            state.discounts = action.payload
        },
        setCondition(state, action: PayloadAction<string>) {
            state.condition = action.payload
        },
        setSize(state, action: PayloadAction<string>) {
            state.size = action.payload
        },
        setWeight(state, action: PayloadAction<string>) {
            state.weight = action.payload
        },
        setProductURL(state, action: PayloadAction<string>) {
            state.url = action.payload
        }

    }
});

export const {
    setProduct,
    setProductID,
    setParentProductID,
    clearProduct,
    addImage,
    setImageDes,
    setImageUrl,
    setNameProduct,
    setDiscounts,
    setPrice,
    setCondition,
    setProductURL,
    setSize,
    setWeight,
    setImageName,
    setDesProduct,
    deleteImageName
} = appAdminStateSlice.actions;

export default appAdminStateSlice.reducer;