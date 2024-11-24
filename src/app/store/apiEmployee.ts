import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeAPI = createApi({
    reducerPath: 'employeeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ["employee"],
    endpoints: (builder) => ({
        getEmployee: builder.query({
            query: () => 'employee',
            providesTags: ["employee"]
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

export const { useGetEmployeeQuery, useAddEmployeeMutation } = employeeAPI;