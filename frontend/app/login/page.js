"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);

      dispatch(loginSuccess(data));

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          spellCheck={false}
        >
          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              autoComplete="new-email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}