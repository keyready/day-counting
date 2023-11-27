import { createSlice } from '@reduxjs/toolkit';
import { createCounter } from '../services/createCounter';
import { CounterSchema } from '../types/CounterSchema';
import { shareCounter } from '../services/shareCounter';
import { deleteCounter } from '../services/deleteCounter';

const initialState: CounterSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const CounterSlice = createSlice({
    name: 'CounterSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCounter.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createCounter.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createCounter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(shareCounter.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(shareCounter.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(shareCounter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteCounter.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteCounter.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteCounter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: CounterActions } = CounterSlice;
export const { reducer: CounterReducer } = CounterSlice;
