import { State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getAppLoading = (state: Pick<State, ReducerName.App>) =>
    state[ReducerName.App].isLoading;
export const getAppError = (state: Pick<State, ReducerName.App>) => state[ReducerName.App].error;
