import { configureStore } from '@reduxjs/toolkit'
import PostReducer from './postSlice.js'

export const store = configureStore({
    reducer: {
        bstore: PostReducer
    },
})

