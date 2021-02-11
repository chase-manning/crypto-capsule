import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Contract } from "web3-eth-contract";

interface Web3State {
  accounts: string[];
  capsuleFactory?: Contract;
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
    setCapsuleFactory: (state, action: PayloadAction<Contract>) => {
      state.capsuleFactory = action.payload;
    },
  },
});

export const { setAccounts, setCapsuleFactory } = web3Slice.actions;

export const selectAccounts = (state: RootState) => state.web3.accounts;
export const selectCapsuleFactory = (state: RootState) =>
  state.web3.capsuleFactory;
export const selectActiveAcount = (state: RootState) =>
  state.web3.accounts.length > 0 ? state.web3.accounts[0] : null;

export default web3Slice.reducer;
