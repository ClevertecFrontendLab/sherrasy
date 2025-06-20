import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';
import { ReducerName } from '~/utils/constant';

import appReducer from './app-status/app-slice';
import bloggerReducer from './blogger/blogger-slice';
import categoryReducer from './categories/categories-slice';
import recipeReducer from './recipes/recipes-slice';
import userReducer from './user/user-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [ReducerName.Recipe]: recipeReducer,
    [ReducerName.Category]: categoryReducer,
    [ReducerName.App]: appReducer,
    [ReducerName.User]: userReducer,
    [ReducerName.Blogger]: bloggerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
