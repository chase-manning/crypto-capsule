import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Web3State {
  accounts: string[];
}

const initialState: Web3State = {
  accounts: [],
};

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<string[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const { setAccounts } = web3Slice.actions;

export const selectAccounts = (state: RootState) => state.web3.accounts;
export const selectActiveAcount = (state: RootState) =>
  state.web3.accounts.length > 0 ? state.web3.accounts[0] : null;

export default web3Slice.reducer;
