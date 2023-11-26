import { rtkApi } from 'shared/api/rtkApi';

const createChatApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchChats: builder.query<string, void>({
            query: () => ({
                url: '/chats',
            }),
        }),
    }),
});

export const useFetchChats = createChatApi.useFetchChatsQuery;
