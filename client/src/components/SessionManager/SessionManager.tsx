// app/components/SessionManager.tsx or wherever you like
"use client";

import useSessionRefresh from "@/hooks/useSessionRefresh";

const SessionManager = () => {
  useSessionRefresh();
  return null;
};

export default SessionManager;
