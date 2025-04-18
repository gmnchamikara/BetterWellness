"use client"; // Required if you're using this in a Client Component

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "@/store/features/users/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Dispatch sign out
    dispatch(signOut());

    // Clear sessionStorage manually
    sessionStorage.removeItem("reduxState");

    // Optionally, navigate to login or home
    router.push("/signin"); // or "/"
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
