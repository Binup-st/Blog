import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUsers : null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true;
            state.error = null
        },
        signInSuccess: (state, action)=>{
            state.currentUsers = action.payload;
            state.loading = false;
            state.error = null
            console.log(action.payload)
        },
        signInFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload
            console.log(action.payload)
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;