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
        userlogoutsuccess: (state) => {
          state.loggedIn = false
        },
      },
})

export const {userloginsuccess, userlogoutsuccess} = userSlice.actions
export default userSlice.reducer