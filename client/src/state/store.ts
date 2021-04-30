import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tokensReducer from "./tokenSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
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
