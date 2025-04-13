// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "@/redux/user/userSlice";
// import OAuth from "@/components/OAuth";
// import Link from "next/link";

// interface FormData {
//   email?: string;
//   password?: string;
// }

// export default function SignIn() {
//   const [formData, setFormData] = useState<FormData>({});
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.user);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       router.push("/");
//     } catch (error: any) {
//       dispatch(signInFailure(error));
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "Sign In"}
//         </button>
//         <OAuth />
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>Don't have an account?</p>
//         <Link href="/sign-up">
//           <span className="text-blue-500">Sign up</span>
//         </Link>
//       </div>
//       <p className="text-red-700 mt-5">
//         {error ? error.message || "Something went wrong!" : ""}
//       </p>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   LockClosedIcon,
//   EnvelopeIcon,
//   HeartIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signinSchema, SigninSchemaType } from "@/schemas/signinSchema";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store/store";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "@/store/features/users/userSlice";
// import OAuth from "@/components/OAuth";
// import { useForm } from "react-hook-form";

// const Signin: React.FC = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.user);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SigninSchemaType>({
//     resolver: zodResolver(signinSchema),
//   });

//   const onSubmit = async (formData: SigninSchemaType) => {
//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       router.push("/");
//     } catch (error: any) {
//       dispatch(signInFailure(error));
//     }
//   };

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ type: "spring", stiffness: 100 }}
//         className="bg-white shadow-sm sticky top-0 z-50"
//       >
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               <HeartIcon className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">
//                 BetterWellness
//               </span>
//             </Link>
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-600">New user?</span>
//               <Link
//                 href="/signup"
//                 className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </motion.header>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={isMounted ? { opacity: 1, y: 0 } : {}}
//         className="flex-grow flex items-center justify-center p-4"
//       >
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
//           <div className="text-center mb-8">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={isMounted ? { scale: 1 } : {}}
//               className="mx-auto mb-4"
//             >
//               <LockClosedIcon className="h-12 w-12 text-blue-600" />
//             </motion.div>
//             <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
//             <p className="mt-2 text-gray-600">
//               Sign in to continue your wellness journey
//             </p>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <motion.div
//               initial={{ x: -20, opacity: 0 }}
//               animate={isMounted ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.2 }}
//             >
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register("email")}
//                   type="email"
//                   className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-700 outline-0 focus:border-blue-700 transition-colors text-gray-800"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </motion.div>

//             <motion.div
//               initial={{ x: 20, opacity: 0 }}
//               animate={isMounted ? { x: 0, opacity: 1 } : {}}
//               transition={{ delay: 0.3 }}
//             >
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register("password")}
//                   type="password"
//                   className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-blue-700 outline-0 focus:border-blue-700 transition-colors text-gray-800"
//                   placeholder="Enter your password"
//                 />
//               </div>
//               {errors.password && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </motion.div>

//             <motion.button
//               disabled={loading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </motion.button>

//             {error && (
//               <p className="text-red-600 text-sm text-center mt-4">
//                 {error.message || "Invalid credentials."}
//               </p>
//             )}

//             <div className="relative mt-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Or sign in with
//                 </span>
//               </div>
//             </div>

//             <OAuth />
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signin;
