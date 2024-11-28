import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeAPI = createApi({
    reducerPath: 'employeeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ["employee", "employeeWithTask"],
    endpoints: (builder) => ({
        getEmployee: builder.query({
            query: () => 'employee',
            providesTags: ["employee"]
        }),
        getEmployeeWithTask: builder.query({
            query: (employeeId) => `employee/${employeeId}`,
            providesTags: ["employeeWithTask"]
        }),
        editEmployeeTask: builder.mutation({
            query: ({taskId, taskStatus}) => ({
                url: `task/${taskId}/employee`,
                method: 'PUT',
                body: taskStatus,
            }),
            invalidatesTags: ["employeeWithTask"]
        }),
        addEmployee: builder.mutation({
            query: (newEmployee) => ({
                url: `employee`,
                method: 'POST',
                body: newEmployee,
            }),
            invalidatesTags: ["employee"]
        }),
    })
})

export const { useGetEmployeeQuery, useGetEmployeeWithTaskQuery, useAddEmployeeMutation, useEditEmployeeTaskMutation } = employeeAPI;