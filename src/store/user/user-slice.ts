import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '~/types/state.type';
import { AuthStatus, ReducerName } from '~/utils/constant';

const initialState: UserState = {
    email: null,
    authStatus: AuthStatus.Unknown,
};

export const userSlice = createSlice({
    name: ReducerName.User,
    initialState,
    reducers: {
        setCurrentEmail: (state, { payload }: PayloadAction<string>) => {
            state.email = payload;
        },
        setAuthStatus: (state, { payload }: PayloadAction<AuthStatus>) => {
            state.authStatus = payload;
        },
    },
    extraReducers() {},
});

export const { setCurrentEmail, setAuthStatus } = userSlice.actions;

export default userSlice.reducer;
