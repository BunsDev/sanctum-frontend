import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Web3 } from "web3";
import {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
} from "web3/lib/commonjs/providers.exports";
import CreateAndAuthenticateSanctumLinkidentityV2 from "../../abi/CreateAndAuthenticateSanctumLinkidentityV2.json";

type GetIdentityForAccountProps = {
  providerInfo: EIP6963ProviderDetail;
  account: string;
};

export const getIdentityForAccount = createAsyncThunk<
  any,
  GetIdentityForAccountProps
>("identity/get", async (payload, thunkApi) => {
  try {
    const { providerInfo, account } = payload;
    console.log("thunkApi", providerInfo, account);

    const web3 = new Web3(providerInfo.provider);
    // console.log(web3.currentProvider)
    console.log(web3.utils.toChecksumAddress(account));

    const sanctumLinkContract = new web3.eth.Contract(
      CreateAndAuthenticateSanctumLinkidentityV2.abi,
      import.meta.env.VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS
    );

    // get an identity
    const identityId: string = await sanctumLinkContract.methods
      .getSanctumLinkIdentity(account)
      .call({
        from: account,
      });

    const isValidIdentity = identityId.length > 0 && !/^0x0+$/.test(identityId);
    console.log({ identityId, isValidIdentity });

    thunkApi.dispatch(setIdentity({identityId, isValidIdentity}));

    return {identityId, isValidIdentity};
  } catch (e) {
    console.error(e);
  }
});

// Then, handle actions in your reducers:
const connectionsSlice = createSlice({
  name: "connections",
  initialState: { 
    providers: [],
    wallets: [],
    loading: "idle",
    selectedProviderName: "",
    selectedAccount: "",
    identityId: "",
    isValidIdentity: false,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setProviders: (state, action: PayloadAction<any>) => {
      console.log("setProviders", action);
      return {
        ...state,
        providers: action.payload,
      };
    },
    setIdentity: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        identityId: action.payload.identityId,
        isValidIdentity: action.payload.isValidIdentity,
      };
    },
    setSelectedProviderName: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        selectedProviderName: action.payload,
      }
    },
    setSelectedAccount: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        selectedAccount: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    //   builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //     // Add user to the state array
    //     state.entities.push(action.payload)
    //   })
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = connectionsSlice;
// Extract and export each action creator by name
export const { setProviders, setIdentity, setSelectedProviderName, setSelectedAccount } = actions;
// Export the reducer, either as a default or named export
export default reducer;
