import { State } from '~/types/state.type';
import { AuthStatus, ReducerName } from '~/utils/constant';

export const getIsAuthorized = (state: Pick<State, ReducerName.User>): boolean =>
    state[ReducerName.User].authStatus === AuthStatus.Auth;
export const getAuthCheckedStatus = (state: Pick<State, ReducerName.User>): boolean =>
    state[ReducerName.User].authStatus !== AuthStatus.Unknown;
export const getUserEmail = (state: Pick<State, ReducerName.User>): string | null =>
    state[ReducerName.User].email;
