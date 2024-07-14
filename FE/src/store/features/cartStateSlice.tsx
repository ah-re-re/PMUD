import { PropsItems } from "@/component/Items";
import { TypeCategory } from "@/page/Admin/componentsAdmin/Category";
import { TypeProduct } from "@/page/Admin/componentsAdmin/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeCard = {
    name: string,
    price: number,
    image: string,
    quantity: number,
}

type appState = {
    cart: Array<TypeCard>;
    name: string,
    phone: string,
    address: string
};

const initialState: appState = {
    cart: [],
    name: "",
    phone: "",
    address: ""
};

export const cardStateSlice = createSlice({
    name: "cardState",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<TypeCard>) => {
            let item = state.cart.find(c => c.name == action.payload.name)
            if (!item) {
                state.cart.push(action.payload);
            }
        },
        removeCard: (state, action: PayloadAction<number>) => {
            state.cart.splice(action.payload, 1)
        },
        clearCard: (state) => {
            state.cart = [];
        },
        setNameCart: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setPhoneCart: (state, action: PayloadAction<string>) => {
            state.phone = action.payload
        },
        setAdressCart: (state, action: PayloadAction<string>) => {
            state.address = action.payload
        },
        setaddQuantity: (state, action: PayloadAction<number>) => {
            state.cart[action.payload].quantity += 1
        },
        setremoveQuantity: (state, action: PayloadAction<number>) => {
            if (state.cart[action.payload].quantity > 1) {
                state.cart[action.payload].quantity -= 1
            }
        },
    }
});

export const {
    addCard,
    removeCard,
    clearCard,
    setNameCart,
    setAdressCart,
    setPhoneCart,
    setaddQuantity,
    setremoveQuantity
} = cardStateSlice.actions;

export default cardStateSlice.reducer;