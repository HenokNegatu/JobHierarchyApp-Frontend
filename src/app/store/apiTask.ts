import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from '../lib/session';

const getTheSession = async () => {
    const session = await getSession()
    return session?.accessToken
}


export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/api`,
        prepareHeaders: async (headers) => {
            const token = await getTheSession()

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["tasks"],
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => 'task',
            providesTags: ["tasks"]
        }),
        getTaskById: builder.query({
            query: (taskId) => `task/${taskId}`,
        }),
        addTask: builder.mutation({
            query: (newTask) => ({
                url: `task/`,
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ["tasks"]
        }),
        editTask: builder.mutation({
            query: ({ taskId, editedTask }) => ({
                url: `task/${taskId}`,
                method: 'PUT',
                body: editedTask,
            }),
            invalidatesTags: ["tasks"]
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `task/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["tasks"]
        }),
        assignEmployeeToTask: builder.mutation({
            query: ({ taskId, employeeId }) => ({
                url: `/task/${taskId}/assign`,
                method: 'POST',
                body: { employeeId },
            }),
            invalidatesTags: ["tasks"]
        }),
        removeEmployeeFromTask: builder.mutation({
            query: ({ taskId, employeeId }) => ({
                url: `/task/${taskId}/remove`,
                method: 'POST',
                body: { employeeId },
            }),
            invalidatesTags: ["tasks"]
        }),
    })
})

export const { useGetTaskQuery, useGetTaskByIdQuery, useEditTaskMutation, useDeleteTaskMutation, useAddTaskMutation, useAssignEmployeeToTaskMutation, useRemoveEmployeeFromTaskMutation } = taskAPI;