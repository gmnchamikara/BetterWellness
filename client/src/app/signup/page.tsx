"use client";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Amplify } from "aws-amplify";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

// UI Customizations
const components = {
  Header() {
    return (
      <View className="mt-4 mb-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-4"
        >
          <UserCircleIcon className="h-14 w-14 text-blue-600" />
        </motion.div>
        <Heading level={3} className="!text-3xl !font-bold text-gray-900">
          Better
          <span className="text-blue-600 font-light">Wellness</span>
        </Heading>
        <p className="text-gray-500 mt-2">
          Start your <span className="font-semibold">wellness journey </span>
          today!
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="client">Client</Radio>
            <Radio value="counsellor">Counsellor</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button
              onClick={toSignIn}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 focus:outline-none"
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};

// Field Customizations
const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  return <>{children}</>;
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  if (!isMounted) return null;

  const isSignUp = pathname.includes("signup");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <HeartIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                BetterWellness
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hidden sm:inline">
                Already have an account?
              </span>
              <Link
                href="/signin"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col items-center justify-center p-6"
      >
        {/* Authenticator OUTSIDE the card */}
        <div className="w-full max-w-md">
          <Authenticator
            initialState={isSignUp ? "signUp" : "signIn"}
            components={components}
            formFields={formFields}
          >
            {() => <AuthenticatedRoute>{children}</AuthenticatedRoute>}
          </Authenticator>
        </div>
      </motion.main>
    </div>
  );
};

export default Auth;
