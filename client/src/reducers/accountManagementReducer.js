import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    customerAccountData: [],
    managerAccountData: []
}

export const accountManagementDataSlice = createSlice({
    name: 'accountmanagementdata',
    initialState,
    reducers: {
        setCustomerData: (state, action) => {
            state.customerAccountData = action.payload
        },
        setManagerData: (state, action) => {
            state.managerAccountData = action.payload
        }
    }
})

export const {setCustomerData, setManagerData} = accountManagementDataSlice.actions
export default accountManagementDataSlice.reducer