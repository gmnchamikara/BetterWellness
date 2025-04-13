"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  EnvelopeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninSchemaType } from "@/schemas/signinSchema";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/redux/user/userSlice";
import OAuth from "@/components/OAuth";

interface FormData {
  email?: string;
  password?: string;
}


const Signin: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      router.push("/");
    } catch (error: any) {
      dispatch(signInFailure(error));
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <HeartIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BetterWellness
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">New user?</span>
              <Link
                href="/signup"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        className="flex-grow flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={isMounted ? { scale: 1 } : {}}
              className="mx-auto mb-4"
            >
              <LockClosedIcon className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to continue your wellness journey
            </p>
          </div>

          <form className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isMounted ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-700 outline-0 focus:border-blue-700 transition-colors text-gray-800"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={isMounted ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </motion.div>

            <div className="flex items-center justify-between">
              <motion.a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
                whileHover={{ x: 5 }}
              >
                Forgot Password?
              </motion.a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </motion.button>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  {/* Google SVG icon */}
                </svg>
                Google
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  {/* Microsoft SVG icon */}
                </svg>
                Microsoft
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
