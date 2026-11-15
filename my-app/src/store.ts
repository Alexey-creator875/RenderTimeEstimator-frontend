import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import renderServerUnitsReducer from "./slices/renderServerUnitsSlice"
import draftReducer from "./slices/draftSlice"


const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        renderServerUnits: renderServerUnitsReducer,
        draft: draftReducer
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
