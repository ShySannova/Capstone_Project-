import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    products: [],
    quantity: 0,
    total: 0,
}



export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.orderedQuantity;
        },
        resetCart: (state)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    }
})

export const { addProduct, resetCart } = cartSlice.actions

export default cartSlice.reducer