// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/features/users/userSlice";

// --- Setup store first without preloadedState ---
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// --- Infer types AFTER store creation ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// --- Now we can load and save localStorage state ---
const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state:", err);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      user: {
        currentUser: state.user.currentUser,
        loading: false,
        error: null,
      },
    });
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Could not save state:", err);
  }
};

// --- Optional: rehydrate user state manually if needed ---
const preloadedState = loadState();
if (preloadedState) {
  store.dispatch({
    type: "user/signInSuccess",
    payload: preloadedState.user?.currentUser,
  });
}

// --- Subscribe to changes ---
store.subscribe(() => {
  saveState(store.getState());
});
