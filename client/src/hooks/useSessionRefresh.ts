"use client";

import { RootState } from "@/store/store";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const ENCRYPTION_KEY = "your-secret-key"; // same key as in store.ts

const encryptState = (state: object) => {
  const serialized = JSON.stringify(state);
  return CryptoJS.AES.encrypt(serialized, ENCRYPTION_KEY).toString();
};

const useSessionRefresh = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  const refreshSession = () => {
    if (!user) return;

    const newExpiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    const dataToSave = {
      user: {
        currentUser: user,
        loading: false,
        error: null,
      },
      expiry: newExpiry,
    };

    const encrypted = encryptState(dataToSave);
    sessionStorage.setItem("reduxState", encrypted);
  };

  useEffect(() => {
    const handleActivity = () => refreshSession();
    const pathname = usePathname();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    useEffect(() => {
      refreshSession();
    }, [pathname]);
    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, [user]);
};

export default useSessionRefresh;
