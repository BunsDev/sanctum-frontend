import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    endpoints: (builder) => ({
      getAuthentication: builder.query<any, string>({
        // How to authenticate here
        query: (id) => `authentication/${id}`,
      }),
    }),
  })

  export const { useGetAuthenticationQuery } = backendApi
