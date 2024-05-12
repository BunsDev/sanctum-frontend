import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { backendApi } from './api/backend'
import confirmationsReducer from './confirmations/confirmationsSlice'
import attributesReducer from './attributes/attributesSlice'

export const store = configureStore({
  reducer: {
    confirmations: confirmationsReducer,
    attributes: attributesReducer,
     // Add the generated reducer as a specific top-level slice
     [backendApi.reducerPath]: backendApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
