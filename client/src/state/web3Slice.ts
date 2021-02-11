import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

interface Web3State {
  web3?: Web3;
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
    setWeb3: (state, action: PayloadAction<Web3>) => {
      state.web3 = action.payload;
    },
    setAccounts: (state, action: PayloadAction<string[]>) => {
      state.accounts = action.payload;
    },
    setCapsuleFactory: (state, action: PayloadAction<Contract>) => {
      state.capsuleFactory = action.payload;
    },
  },
});

export const { setWeb3, setAccounts, setCapsuleFactory } = web3Slice.actions;

export const selectWeb3 = (state: RootState) => state.web3.web3;
export const selectAccounts = (state: RootState) => state.web3.accounts;
export const selectCapsuleFactory = (state: RootState) =>
  state.web3.capsuleFactory;
export const selectActiveAcount = (state: RootState) => state.web3.accounts[0];

export default web3Slice.reducer;
