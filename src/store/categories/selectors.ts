import { createSelector } from '@reduxjs/toolkit';

import { State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getTabInfo = createSelector(
    [
        (state: Pick<State, ReducerName.Category>) => state[ReducerName.Category].tabCategory,
        (state: Pick<State, ReducerName.Category>) => state[ReducerName.Category].tabSubcategory,
    ],
    (category, subcategory) => ({ category, subcategory }),
);
