import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/features/users/userSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // optional: add middleware or devTools config here
});

// Infer types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
