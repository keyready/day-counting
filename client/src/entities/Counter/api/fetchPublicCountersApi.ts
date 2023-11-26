import { rtkApi } from 'shared/api/rtkApi';
import { Counter } from '../model/types/Counter';

const fetchPublicCounters = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCounters: builder.query<Counter[], void>({
            query: () => ({
                url: '/api/public_counters',
            }),
        }),
    }),
});

export const usePublicCounters = fetchPublicCounters.useFetchCountersQuery;
