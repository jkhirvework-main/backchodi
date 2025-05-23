import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    drawer: {
        isOpen: false
    }, pinOutDrawer: {
        isOpen: false,
        preData: []
    }, compChecksDrawer: {
        isOpen: false,
        preData: []
    }, dtcDrawer: {
        isOpen: false,
        preData: []
    }, singleDtcDrawer: {
        isOpen: false,
        preData: {}
    }
}

export const viewerSlice = createSlice({
    name: 'viewerSlice',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setPinOutDrawer: (state, action) => {
            state.pinOutDrawer = action.payload
        },
        setCompChecksDrawer: (state, action) => {
            state.compChecksDrawer = action.payload
        },
        setDtcDrawer: (state, action) => {
            state.dtcDrawer = action.payload
        },
        setSingleDtcDrawer: (state, action) => {
            state.singleDtcDrawer = action.payload
        }
    }
})


export const {
    setDrawer,
    setPinOutDrawer,
    setCompChecksDrawer,
    setDtcDrawer,
    setSingleDtcDrawer
} = viewerSlice.actions;

export default viewerSlice.reducer;