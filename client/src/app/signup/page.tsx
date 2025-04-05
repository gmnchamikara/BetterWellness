import React from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Header";

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-4"
            >
              <UserCircleIcon className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          </div>

          <form className="space-y-6">
            {[
              { icon: UserCircleIcon, label: "Full Name", type: "text" },
              { icon: EnvelopeIcon, label: "Email", type: "email" },
              { icon: PhoneIcon, label: "Phone Number", type: "tel" },
              { icon: LockClosedIcon, label: "Password", type: "password" },
            ].map((field, idx) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={field.type}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
