import { createSelector } from '@reduxjs/toolkit';

import { Category } from '~/types/category.type';
import { State } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

export const getTabInfo = createSelector(
    [
        (state: Pick<State, ReducerName.Category>) => state[ReducerName.Category].tabCategory,
        (state: Pick<State, ReducerName.Category>) => state[ReducerName.Category].tabSubcategory,
    ],
    (category, subcategory) => ({ category, subcategory }),
);

export const getCategories = (state: Pick<State, ReducerName.Category>): Category[] =>
    state[ReducerName.Category].categories;
