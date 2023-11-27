import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface Props {
    receiverLogin: string;
    counterId: number;
}

export const shareCounter = createAsyncThunk<string, Props, ThunkConfig<string>>(
    'Counter/shareCounter',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/share_counter', props);

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
