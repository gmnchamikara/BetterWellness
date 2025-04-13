"use client";
// import OAuth from "@/components/OAuth";
import { signupSchema, SignupSchemaType } from "@/schemas/signupSchema";
import {
  EnvelopeIcon,
  HeartIcon,
  LockClosedIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

const Signup: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

 const onSubmit = async (data: SignupSchemaType) => {
   console.log("---Form submitted data:", data); 
   setLoading(true);
   setSubmitError("");

   try {
     const res = await fetch("/api/auth/signup", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });

     const result = await res.json();
     if (!res.ok || result.success === false) {
       setSubmitError(result.message || "Signup failed.");
       return;
     }

     router.push("/signin");
   } catch (err) {
     setSubmitError("Network error. Please try again.");
   } finally {
     setLoading(false);
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
              <span className="text-gray-600">Already have an account?</span>
              <Link
                href="/signin"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Sign In
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
              <UserCircleIcon className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">
              Start Your Wellness Journey Today !
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {[
              {
                idx: 1,
                icon: UserCircleIcon,
                label: "Full Name",
                type: "text",
                placeholder: "Enter your First Name",
                id: "fullname",
              },
              {
                idx: 3,
                icon: EnvelopeIcon,
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                id: "email",
              },
              {
                idx: 4,
                icon: PhoneIcon,
                label: "Phone Number",
                type: "tel",
                placeholder: "Enter your phone number",
                id: "phone",
              },
              {
                idx: 5,
                icon: LockClosedIcon,
                label: "Password",
                type: "password",
                placeholder: "Create a password",
                id: "password",
              },
            ].map(({ id, label, type, icon: Icon, idx }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <div className="relative">
                  <Icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" />
                  <input
                    type={type}
                    id={id}
                    {...register(id as keyof SignupSchemaType)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-700 outline-0 focus:border-blue-700 transition-colors text-gray-800"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                </div>
                {errors[id as keyof SignupSchemaType] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[id as keyof SignupSchemaType]?.message}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.button
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {loading ? "Loading..." : "Create Account"}
            </motion.button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex justify-center items-center">
                <p className="text-red-600">
                  {submitError && (
                    <p className="text-red-600 text-sm text-center mt-4">
                      {submitError}
                    </p>
                  )}
                </p>
              </div>
            </div>

            {/* <OAuth /> */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
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

            <p className="text-center text-sm text-gray-600 mt-6">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800"
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
