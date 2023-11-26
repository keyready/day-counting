import { StateSchema } from 'app/providers/StoreProvider';

export const getCounterData = (state: StateSchema) => state.counter.data;
export const getCounterIsLoading = (state: StateSchema) => state.counter.isLoading;
export const getCounterError = (state: StateSchema) => state.counter.error;
