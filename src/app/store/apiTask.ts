import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        addTask: builder.mutation({
            query: (newTask) => ({
                url: `task/`,
                method: 'POST',
                body: newTask,
            })
        }),
    })
})

export const { useAddTaskMutation } = taskAPI;