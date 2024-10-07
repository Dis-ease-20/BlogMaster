// track authentication in store - check if user login data is present or not

import { createSlice } from '@reduxjs/toolkit'


//Base/default state of user
const initialState= {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

//Here action in reducer means  = login and logout 


export const {login, logout} = authSlice.actions;
export default authSlice.reducer