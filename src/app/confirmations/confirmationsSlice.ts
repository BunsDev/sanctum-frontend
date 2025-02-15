import { createSlice } from "@reduxjs/toolkit";

// Then, handle actions in your reducers:
const confirmationsSlice = createSlice({
  name: "confirmations",
  initialState: { entities: [], loading: "idle" },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    //   builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //     // Add user to the state array
    //     state.entities.push(action.payload)
    //   })
  },
});

export default confirmationsSlice.reducer
