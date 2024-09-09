import { createSlice } from '@reduxjs/toolkit';

/* Initial State */
const initialState = {
    account: null,
    accessToken: null,
    email: null
}

/* Reducer */
const reducers = {
    login: (state, action) => {
        state.account = action.payload;
    },

    logout: (state) => {
        state.account = null;
        return {};
    },

    setAccessToken: (state, action) => {
        const { accessToken } = action.payload;
        state.accessToken = accessToken;
    },

    setEmail: (state, action) => {
        state.email = action.payload;
    }
}

/* Slice */
export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers
});

/* Actions */
export const {
    login, logout, setAccessToken,
    setEmail
} = authSlice.actions;

export default authSlice.reducer;