import React from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Header";

const CustomerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="customer" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow p-4 md:p-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
              Upcoming Sessions
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Session with Dr. Smith</h3>
                      <p className="text-gray-600 text-sm">
                        Tomorrow at 2:00 PM
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      Join
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                Find Counsellors
              </h2>
              <p className="text-gray-600 mb-4">
                Browse our network of qualified professionals
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Browse
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
                Messages
              </h2>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100" />
                      <div>
                        <h3 className="font-medium">Dr. Johnson</h3>
                        <p className="text-gray-600 text-sm">
                          Hi! How can I help...
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
