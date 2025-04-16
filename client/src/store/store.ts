// store.ts
import userReducer, { signOut } from "@/store/features/users/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

// Define encryption key (should come from .env in production)
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "Nuwan2025";

// -- AES Encryption/Decryption Helpers --
const encryptState = (state: object) => {
  const serialized = JSON.stringify(state);
  return CryptoJS.AES.encrypt(serialized, ENCRYPTION_KEY).toString();
};

const decryptState = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

// -- Load state from sessionStorage --
const loadState = (): any => {
  try {
    const encrypted = sessionStorage.getItem("reduxState");
    if (!encrypted) return undefined;

    const decrypted = decryptState(encrypted);
    const now = Date.now();

    if (decrypted.expiry && decrypted.expiry > now) {
      return { user: decrypted.user };
    } else {
      sessionStorage.removeItem("reduxState");
      return undefined;
    }
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

// -- Save state to sessionStorage with new expiry --
const saveState = (state: RootState, refreshExpiryOnly = false) => {
  try {
    const expiryTimestamp = Date.now() + 24 * 60 * 60 * 1000; // 1 day
    const currentUser = state.user.currentUser;

    if (!currentUser) {
      sessionStorage.removeItem("reduxState");
      return;
    }

    const dataToSave = {
      user: {
        currentUser,
        loading: false,
        error: null,
      },
      expiry: expiryTimestamp,
    };

    const encrypted = encryptState(dataToSave);
    sessionStorage.setItem("reduxState", encrypted);
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};

// -- Store Setup --
// const preloadedState = loadState();
const preloadedState = typeof window !== "undefined" ? loadState() : undefined;

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// -- Auto sign-out if no preloaded state --
if (!preloadedState) {
  store.dispatch(signOut());
}

if (typeof window !== "undefined") {
  // Save on store updates
  store.subscribe(() => {
    saveState(store.getState());
  });

  // Auto-refresh session expiry on activity
  let activityTimeout: NodeJS.Timeout | null = null;
  const refreshExpiry = () => {
    if (activityTimeout) clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
      saveState(store.getState());
    }, 1000);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", refreshExpiry);
    window.addEventListener("keydown", refreshExpiry);
    window.addEventListener("click", refreshExpiry);
    window.addEventListener("scroll", refreshExpiry);
  }
}
