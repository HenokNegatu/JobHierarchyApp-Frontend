import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from '../lib/session';

const getTheSession = async ()=>{
  const session = await getSession()
  return session?.accessToken
}


export const positionAPI = createApi({
  reducerPath: 'productsAPI',
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