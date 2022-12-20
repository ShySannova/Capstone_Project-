import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    currentUser: null,
    isFetching:false,
    error:false,
    isLogged:false,
    isAdmin:false,
}



export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true;
        },
        loginSuccess: (state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload
            state.isLogged=true;
        },
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        resetStore: (state)=>{
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.isLogged = false;  
            state.isAdmin = false;
        },
        setAdmin:(state)=>{
            state.isAdmin =true;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, resetStore , setAdmin} =userSlice.actions

export default userSlice.reducer