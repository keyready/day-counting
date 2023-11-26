import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUser.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchUser.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
