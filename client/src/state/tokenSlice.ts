import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Token from "../types/Token";
import { RootState } from "./store";

interface TokenSlice {
  tokens: Token[];
}

const initialState: TokenSlice = {
  tokens: [],
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
  },
});

export const { setTokens } = tokenSlice.actions;

export const selectTokens = (state: RootState) => state.tokens.tokens;

export default tokenSlice.reducer;
