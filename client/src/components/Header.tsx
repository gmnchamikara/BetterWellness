import React from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  userType?: "customer" | "counsellor";
}

const Header: React.FC<HeaderProps> = ({ userType }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <HeartIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              BetterWellness
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            {!userType ? (
              <>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Sign In
                </motion.a>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </motion.a>
              </>
            ) : (
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Dashboard
              </motion.a>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
