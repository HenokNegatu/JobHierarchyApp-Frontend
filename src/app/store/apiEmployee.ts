import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        addEmployee: builder.mutation({
            query: (newEmployee) => ({
                url: `employee/`,
                method: 'POST',
                body: newEmployee,
            })
        }),
    })
})

export const { useAddEmployeeMutation } = employeeAPI;