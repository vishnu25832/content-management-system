"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "../redux/slices/authSlice";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // Restore authentication after page refresh
    dispatch(
      loginSuccess({
        token,
        admin: {
          name: "Admin",
          email: "",
        },
      })
    );
  }, [dispatch, isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return children;
}