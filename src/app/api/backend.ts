import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8787/api/v1/' }),
    endpoints: (builder) => ({
      // 
      createCodeConfirmation: builder.mutation<any, any>({
        query: ({ ...payload }) => ({
          url: 'confirmation',
          method: 'POST',
          body: payload
        })
      }),
      // 
      confirmCode: builder.mutation<any, any>({
        query: ({ id, ...payload }) => ({
          url: `confirmation/${id}`,
          method: 'PUT',
          body: payload,
        })
      }),
      //
      uploadPhoto: builder.mutation<any, any>({
        query: ({ ...payload }) => ({
          url: `upload`,
          method: 'PUT',
          body: payload,
        })
      }),

    }),
  })

  export const { useCreateCodeConfirmationMutation, useConfirmCodeMutation, useUploadPhotoMutation } = backendApi
