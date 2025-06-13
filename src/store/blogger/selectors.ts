import { State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getBloggerName = (state: Pick<State, ReducerName.Blogger>): string =>
    state[ReducerName.Blogger].bloggerName || '';
