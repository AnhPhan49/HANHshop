import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import accountManagementReducer from './reducers/accountManagementReducer'

export const store = configureStore({
  reducer: {
      user: userReducer,
      accountdata: accountManagementReducer
  },
})