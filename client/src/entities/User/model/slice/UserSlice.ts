import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAuth } from '../services/userAuth';
import { UserSchema } from '../types/UserSchema';
import { User } from '../types/User';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
        logout: (state) => {
            state.data = undefined;
            localStorage.removeItem('userdata');
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userAuth.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(userAuth.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
                localStorage.setItem('userdata', JSON.stringify(action.payload));
            })
            .addCase(userAuth.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
