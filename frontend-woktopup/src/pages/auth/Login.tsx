import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useAuth } from "../../components/auth/AuthContext";
import axios from "axios";
// import api from '../../components/auth/axiosConfig';
import axiosTest from "../../plugins/axios";

export const Login: React.FC = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Login pengguna
      await axiosTest.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // Ambil data pengguna dan simpan
      const { data } = await axiosTest.get("/user", {
        withCredentials: true,
      });
      setUser(data);
      localStorage.setItem("user_id", data.id);

      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Login failed. Please try again.";
        setError(message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <LogIn className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Sign in to your account
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};
