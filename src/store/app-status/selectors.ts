import { State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getAppLoading = (state: Pick<State, ReducerName.App>) =>
    state[ReducerName.App].isLoading;
export const getAppMessage = (state: Pick<State, ReducerName.App>) =>
    state[ReducerName.App].alertMessage;
export const getAppModalOpen = (state: Pick<State, ReducerName.App>) =>
    state[ReducerName.App].isModalOpened;
