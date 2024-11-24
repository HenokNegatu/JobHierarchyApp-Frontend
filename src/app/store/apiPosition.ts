import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const positionAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ["positions", "positionsById"],
  endpoints: (builder) => ({
    getPosition: builder.query({
      query: () => 'positions',
      providesTags: ["positions"]
    }),
    getPositionById: builder.query({
      query: (id) => `positions/hierarchy/${id}`,
      providesTags: ["positionsById"]
    }),
    addPosition: builder.mutation({
      query: (newPosition) => ({
        url: `positions/`,
        method: 'POST',
        body: newPosition,
      }),
      invalidatesTags: ["positions", "positionsById"]
    }),
    editPosition: builder.mutation({
      query: ({ id, updatedPosition }) => ({
        url: `positions/${id}`,
        method: 'PUT',
        body: updatedPosition,
      }),
      invalidatesTags: ["positions", "positionsById"]
    }),
    deletePosition: builder.mutation({
      query: ({ id, deleteChildren }) => ({
        url: `positions/${id}/?deleteChildren=${deleteChildren}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["positions", "positionsById"]
    }),
  }),
});

export const {
  useGetPositionQuery,
  useGetPositionByIdQuery,
  useAddPositionMutation,
  useEditPositionMutation,
  useDeletePositionMutation,
 } = positionAPI;