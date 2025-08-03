import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import axios from "axios";
import axiosTest from "../../plugins/axios";

export const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosTest.post(
        "/auth/register",
        {
          name,
          email,
          phone_number: phone,
          password,
          password_confirmation: passwordConfirmation,
        },
        { withCredentials: true }
      );

      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          "Registration failed. Please try again.";
        setError(message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <UserPlus className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create an account
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Join WokTopup today</p>
      </div>

      <form className="space-y-6" onSubmit={handleRegister}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Enter your name"
          />
        </div>

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
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Enter your phone number"
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
            placeholder="Create a password"
          />
        </div>

        <div>
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Repeat Password
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};
