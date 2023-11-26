import { rtkApi } from 'shared/api/rtkApi';
import { Counter } from '../model/types/Counter';

const fetchPublicCounters = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCounters: builder.query<Counter[], number>({
            query: (userId) => ({
                url: '/api/public_counters',
                params: {
                    userId,
                },
            }),
        }),
    }),
});

export const usePublicCounters = fetchPublicCounters.useFetchCountersQuery;
