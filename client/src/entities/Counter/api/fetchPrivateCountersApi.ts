import { rtkApi } from 'shared/api/rtkApi';
import { Counter } from 'entities/Counter';

const fetchPrivateCounters = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPrivateCounters: builder.query<Counter[], number>({
            query: (userId) => ({
                url: '/api/private_counters',
                params: {
                    userId,
                },
            }),
        }),
    }),
});
export const usePrivateCounters = fetchPrivateCounters.useFetchPrivateCountersQuery;
