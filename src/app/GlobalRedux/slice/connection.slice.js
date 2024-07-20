import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    wireTooltipInfo: {
        isOpen: false,
        title: 'Text',
        placement: 'top',
        left: 0,
        top: 0
    }
}

export const connectionSlice = createSlice({
    name: 'conenctionSlice',
    initialState,
    reducers: {
        setWireTooltip: (state, action) => {
            const payload = action.payload;

            if(payload.isOpen){
                state.wireTooltipInfo = payload;
            }else {
                state.wireTooltipInfo.isOpen = false;
            }
        }
    }
})

export const {
    setWireTooltip
} = connectionSlice.actions;

export default connectionSlice.reducer;