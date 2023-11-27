import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getUserData } from 'entities/User';
import { Counter } from '../types/Counter';

export const createCounter = createAsyncThunk<string, Partial<Counter>, ThunkConfig<string>>(
    'Counter/createCounter',
    async (counter, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const userId = getUserData(getState())?.id;
        const hostName = getUserData(getState())?.name;

        try {
            const response = await extra.api.post<string>('/api/create_counter', {
                ...counter,
                hostId: userId,
                hostName,
            });

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
