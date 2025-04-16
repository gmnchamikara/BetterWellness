import React from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Auth/Header";

const CounsellorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="counsellor" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow p-4 md:p-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Schedule */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
              Today's Schedule
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
                      <h3 className="font-medium">Session with Sarah</h3>
                      <p className="text-gray-600 text-sm">2:00 PM - 3:00 PM</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      Start
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats and Clients */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
                Statistics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Upcoming Sessions</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Sessions</span>
                  <span className="font-medium">42</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-blue-600" />
                Active Clients
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100" />
                    <span>Client {item}</span>
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

export default CounsellorDashboard;
