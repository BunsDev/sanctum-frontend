import { createSlice } from "@reduxjs/toolkit";
import { AttrbuteType } from "../../pages/Attributes/AddAttribute";

// Then, handle actions in your reducers:
const attributesSlice = createSlice({
  name: "attributes",
  initialState: { myAttributes: [
    // { type: AttrbuteType.EMAIL, name: "my@mailcom" },
    // { type: AttrbuteType.PHONE, name: "(800) 555‑0175" },
    // { type: AttrbuteType.ADDRESS, name: "Street 123, 8000, Zurich, Switzerland" },
    // { type: AttrbuteType.WALLET, name: "mywallet.eth" },
    // { type: AttrbuteType.ID, name: "Firstname Lastname" },
  ], loading: "idle" },
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

export default attributesSlice.reducer
