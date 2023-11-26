import { createSlice } from '@reduxjs/toolkit';
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
    // extraReducers: ((builder) => {
    //     builder
    //         .addCase(fetchCounter.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchCounter.fulfilled, (
    //             state,
    //             action: PayloadAction<any>,
    //         ) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchCounter.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // }),
});

export const { actions: CounterActions } = CounterSlice;
export const { reducer: CounterReducer } = CounterSlice;
