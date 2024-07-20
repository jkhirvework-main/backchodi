import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    drawer: {
        isOpen: false
    }
}

export const viewerSlice = createSlice({
    name: 'viewerSlice',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawer = action.payload
        }
    }
})


export const {
    setDrawer
} = viewerSlice.actions;

export default viewerSlice.reducer;