import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import web3Reducer from "./web3Slice";
import tokensReducer from "./tokenSlice";

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
    tokens: tokensReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
