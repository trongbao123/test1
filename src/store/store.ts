import { configureStore } from "@reduxjs/toolkit"
import matrixSlice from "../store/Matrix"
export const store = configureStore({
  reducer: {
    matrixSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
