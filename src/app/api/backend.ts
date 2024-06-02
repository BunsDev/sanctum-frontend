import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getAttributes: builder.query<any, string>({
      // How to authenticate here
      query: (identityId) => `identity/${identityId}/attributes`,
    }),
    //
    createCodeConfirmation: builder.mutation<any, any>({
      query: ({ ...payload }) => ({
        url: "confirmation",
        method: "POST",
        body: payload,
      }),
    }),
    //
    confirmCode: builder.mutation<any, any>({
      query: ({ id, ...payload }) => ({
        url: `confirmation/${id}`,
        method: "POST",
        body: payload,
      }),
    }),
    //
    storeIdentity: builder.mutation<any, any>({
      query: ({ id, ...payload }) => ({
        url: `identity/${id}`,
        method: "POST",
        body: payload,
      }),
    }),
    storeAttributes: builder.mutation<any, any>({
      query: ({ id, ...payload }) => ({
        url: `identity/${id}/attributes`,
        method: "POST",
        body: payload.attributes,
      }),
    }),
    storeAuthentication: builder.mutation<any, any>({
      query: ({ ...payload }) => ({
        url: `authentication`,
        method: "POST",
        body: payload,
      }),
    }),
    //
    uploadPhoto: builder.mutation<any, any>({
      query: ({ ...payload }) => ({
        url: `upload`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateCodeConfirmationMutation,
  useConfirmCodeMutation,
  useUploadPhotoMutation,
  useStoreIdentityMutation,
  useStoreAttributesMutation,
  useGetAttributesQuery,
  useStoreAuthenticationMutation,
} = backendApi;
