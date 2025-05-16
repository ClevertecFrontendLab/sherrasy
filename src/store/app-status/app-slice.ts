import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertMessage } from '~/types/api-message.type';
import { AppState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: AppState = {
    isLoading: false,
    alertMessage: null,
};

export const appSlice = createSlice({
    name: ReducerName.App,
    initialState,
    reducers: {
        setAppMessage(state, { payload }: PayloadAction<AlertMessage | null>) {
            state.alertMessage = payload;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
    },
});

export const { setAppMessage, setAppLoader } = appSlice.actions;

export default appSlice.reducer;
