import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: !!localStorage.getItem("token"),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userloginsuccess: (state) => {
          state.loggedIn = true
        },
      },
})

export const {userloginsuccess} = userSlice.actions
export default userSlice.reducer