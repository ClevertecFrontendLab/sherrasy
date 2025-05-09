import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: AppState = {
    isLoading: false,
    hasError: false,
    error: '' as 'load' | 'search' | null,
};

export const appSlice = createSlice({
    name: ReducerName.App,
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<'load' | 'search' | null>) {
            state.error = error;
            state.hasError = error ? true : false;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
            state.hasError = false;
        },
    },
});

export const { setAppError, setAppLoader } = appSlice.actions;

export default appSlice.reducer;
