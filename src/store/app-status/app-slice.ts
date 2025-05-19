import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertMessage } from '~/types/api-message.type';
import { AppState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: AppState = {
    isLoading: false,
    isModalOpened: false,
    alertMessage: null,
};

export const appSlice = createSlice({
    name: ReducerName.App,
    initialState,
    reducers: {
        setAppMessage(state, { payload }: PayloadAction<AlertMessage | null>) {
            state.alertMessage = payload;
        },
        setModalOpened(state, { payload }: PayloadAction<boolean>) {
            state.isModalOpened = payload;
        },
        setAppLoader(state, { payload }: PayloadAction<boolean>) {
            state.isLoading = payload;
        },
    },
});

export const { setAppMessage, setAppLoader, setModalOpened } = appSlice.actions;

export default appSlice.reducer;
