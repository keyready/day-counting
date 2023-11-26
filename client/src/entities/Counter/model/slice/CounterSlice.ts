import { createSlice } from '@reduxjs/toolkit';
import { createCounter } from '../services/createCounter';
import { CounterSchema } from '../types/CounterSchema';

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
            });
    },
});

export const { actions: CounterActions } = CounterSlice;
export const { reducer: CounterReducer } = CounterSlice;
