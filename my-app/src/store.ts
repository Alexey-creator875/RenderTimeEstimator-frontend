import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import renderServerUnitsReducer from "./slices/renderServerUnitsSlice"


export default configureStore({
    reducer: combineReducers({
        user: userReducer,
        renderServerUnits: renderServerUnitsReducer
    })
})