// app/dashboard/layout.tsx
"use client";

import {
  Bars3Icon,
  CalendarIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import navigation from "@/utils/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; 
import DashboardHeader from "@/components/dashboard/DashboardHeader";



export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isClient, setIsClient] = useState(false); // Track if we’re on the client
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-blue-900 text-white">
        <h1 className="text-xl font-bold">BetterWellness</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-blue-800"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Navigation Sidebar */}
      <AnimatePresence>
        {isClient && (isSidebarOpen || screenWidth >= 768) && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="w-64 fixed md:relative h-full bg-blue-900 text-white flex flex-col z-50"
          >
            <div className="p-6">
              <h1 className="text-2xl font-bold">BetterWellness</h1>
              <p className="text-sm text-blue-200 mt-1">
                Health & Wellness Platform
              </p>
            </div>

            <div className="flex-1 px-3 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <a
                      href={item.href}
                      onClick={() => {
                        if (screenWidth < 768) setIsSidebarOpen(false);
                      }}
                      className={`flex items-center p-3 rounded-lg ${
                        pathname === item.href
                          ? "bg-blue-700 text-white"
                          : "hover:bg-blue-800"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="hidden md:inline">{item.name}</span>
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Header */}
        {/* <div className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Dashboard
            </h2>
            <div className="mt-1 flex items-center gap-2 text-gray-600">
              <span>Welcome back,</span>
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.profilePicture && (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser.fullname}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-medium text-red-500">
                  Sign In
                </span>
              )}
            </div>
          </div>

          <a
            href="/"
            className="self-start md:self-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            Logout
          </a>
        </div> */}
        <DashboardHeader currentUser={currentUser} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard
            title="Weekly Sessions"
            value="15"
            percentage="40"
            trend="increase"
            icon={<CalendarIcon className="h-6 w-6 text-blue-600" />}
          />

          <StatCard
            title="Active Messages"
            value="45"
            percentage="19"
            trend="decrease"
            icon={<CalendarIcon className="h-6 w-6 text-blue-600" />}
          />

          <StatCard
            title="Online Counselors"
            value="12"
            percentage="5"
            trend="increase"
            icon={<UserIcon className="h-6 w-6 text-blue-600" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">
              Session Statistics
            </h3>
            <div className="h-48 md:h-64 bg-gray-50 rounded-lg"></div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">
              Traffic Sources
            </h3>
            <div className="space-y-3 md:space-y-4">
              <TrafficSource label="Direct" percentage="60" color="blue" />
              <TrafficSource label="Referral" percentage="25" color="indigo" />
              <TrafficSource label="Social" percentage="15" color="pink" />
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, percentage, trend, icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-4 md:p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">{value}</p>
          <div className="flex items-center mt-1 md:mt-2">
            <span
              className={`text-sm ${
                trend === "increase" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "increase" ? "↑" : "↓"} {percentage}%
            </span>
          </div>
        </div>
        <div className="bg-blue-100 p-2 md:p-3 rounded-lg">{icon}</div>
      </div>
    </motion.div>
  );
}

// TrafficSource Component
function TrafficSource({ label, percentage, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`h-3 w-3 bg-${color}-500 rounded-full mr-2 md:mr-3`}
        ></div>
        <span className="text-gray-600 text-sm md:text-base">{label}</span>
      </div>
      <span className="font-medium text-sm md:text-base">{percentage}%</span>
    </div>
  );
}
