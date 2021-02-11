import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import web3Reducer from "./web3Slice";

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
