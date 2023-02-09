import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            listUsers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.listUsers = action.payload;
        },
        getUserFail: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.listUsers = action.payload;
        },
        deleteUserFail: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        clearListUsers: (state) => {
            state.users.listUsers = null;
        }
    }
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFail,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail,
    clearListUsers
} = userSlice.actions;

export default userSlice.reducer;