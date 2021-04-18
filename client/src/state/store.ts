import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import web3Reducer from "./userSlice";
import tokensReducer from "./tokenSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
    tokens: tokensReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
