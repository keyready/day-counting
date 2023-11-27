import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios, { AxiosError } from 'axios';
import { User } from '../types/User';

interface LoginProps {
    password: string;
    login: string;
    name?: string;
}

export const userAuth = createAsyncThunk<
    User,
    LoginProps,
    ThunkConfig<{ message: string; status: number }>
>('User/userAuth', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<User>('/api/user_auth', props);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (err) {
        const axiosError = err as AxiosError;
        console.log(err);
        return rejectWithValue(axiosError.response?.data);
    }
});
