import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: !!localStorage.getItem("token"),
  user: {}
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
        savecurrentuserdata: (state, action) => {
          state.user = action.payload
        }
      },
})

export const {userloginsuccess, userlogoutsuccess, savecurrentuserdata} = userSlice.actions
export default userSlice.reducer