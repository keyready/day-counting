import { rtkApi } from 'shared/api/rtkApi';
import { Counter } from '../model/types/Counter';

const fetchPublicCounters = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCounters: builder.query<Counter[], void>({
            query: () => ({
                url: '/api/public_counter',
            }),
        }),
    }),
});

const fetchPrivateCounters = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCounters: builder.query<Counter[], number>({
            query: (userId) => ({
                url: '/api/private_counter',
                params: {
                    userId,
                },
            }),
        }),
    }),
});

export const usePublicCounters = fetchPublicCounters.useFetchCountersQuery;
export const usePrivateCounters = fetchPrivateCounters.useFetchCountersQuery;
