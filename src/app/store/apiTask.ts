import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => 'task',
            providesTags: ["tasks"]
          }),
        addTask: builder.mutation({
            query: (newTask) => ({
                url: `task/`,
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ["tasks"]
        }),
    })
})

export const { useGetTaskQuery, useAddTaskMutation } = taskAPI;