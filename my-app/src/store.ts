import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import renderServerUnitsReducer from "./slices/renderServerUnitsSlice"


const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        renderServerUnits: renderServerUnitsReducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
