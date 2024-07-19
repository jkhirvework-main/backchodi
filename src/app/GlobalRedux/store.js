
'use client'

import connectionSlice from "./slice/connection.slice";
import viewerSclice from "./slice/viewer.sclice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        connectionSlice,
        viewerSclice
    }
})