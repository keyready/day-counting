import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Counter } from '../types/Counter';

export const fetchCounter = createAsyncThunk<Counter, string, ThunkConfig<string>>(
    'Counter/fetchCounter',
    async (CounterId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Counter>('/url');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
