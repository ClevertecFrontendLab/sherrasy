import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BloggerState } from '~/types/state.type';
import { ReducerName } from '~/utils/constant';

const initialState: BloggerState = {
    bloggerName: null,
};

export const bloggerSlice = createSlice({
    name: ReducerName.Blogger,
    initialState,
    reducers: {
        setBloggerName: (state, { payload }: PayloadAction<string>) => {
            state.bloggerName = payload;
        },
    },
    extraReducers() {},
});

export const { setBloggerName } = bloggerSlice.actions;

export default bloggerSlice.reducer;
