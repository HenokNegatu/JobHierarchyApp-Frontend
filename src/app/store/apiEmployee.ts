import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from '../lib/session';

const getTheSession = async ()=>{
    const session = await getSession()
    return session?.accessToken
}


export const employeeAPI = createApi({
    reducerPath: 'employeeAPI',
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
        editEmployee: builder.mutation({
            query: ({employeeId, editedEmployee}) => ({
                url: `employee/${employeeId}`,
                method: 'PUT',
                body: editedEmployee,
            }),
            invalidatesTags: ["employee"]
        }),
    })
})

export const { useGetEmployeeQuery, useGetEmployeeWithTaskQuery, useAddEmployeeMutation, useEditEmployeeMutation, useEditEmployeeTaskMutation } = employeeAPI;