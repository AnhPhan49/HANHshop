import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryList: []
}

export const shopSlice = createSlice({
    name: 'shopdata',
    initialState,
    reducers: {
        saveCategoryData: (state, action) => {
            state.categoryList = action.payload
        }
    }
})

export const {saveCategoryData} = shopSlice.actions
export default shopSlice.reducer