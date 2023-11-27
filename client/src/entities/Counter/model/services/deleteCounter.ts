import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

export const deleteCounter = createAsyncThunk<string, number, ThunkConfig<string>>(
    'Counter/deleteCounter',
    async (counterId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/delete_counter', { counterId });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data);
        }
    },
);
