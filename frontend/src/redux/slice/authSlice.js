import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        title: "Sign in",
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            currentUser: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload;
        },
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.currentUser = action.payload;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
        },
        refreshToken: (state, action) => {
            state.login.currentUser = action.payload;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
        },
    }
})

export const {
    changeTitle,
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    refreshToken,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions;

export default authSlice.reducer;