import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    data:null,
    products:null,
}



export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers: {
        isStart: (state, action)=>{
            state.data= action.payload;
        },
        setProducts: (state, action)=>{
            state.products= action.payload;
        },
        setProductQuantity: (state, action)=>{
            let p =state.products
           console.log(initialState)
        }
    }
})

export const { isStart, setProducts, setProductQuantity} = menuSlice.actions

export default menuSlice.reducer