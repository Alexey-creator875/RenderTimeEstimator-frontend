import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        setAuthenticated(state, {payload}) {
            state.isAuthenticated = payload
        }
    },
});

export const {
    setAuthenticated: setAuthenticatedAction
} = userSlice.actions

export default userSlice.reducer