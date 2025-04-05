"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const CustomerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Temporary data - replace with real data from your backend
  const [upcomingSessions] = useState([
    {
      id: 1,
      counsellor: "Dr. Sarah Smith",
      date: "2023-08-25 14:00",
      type: "Video",
    },
    {
      id: 2,
      counsellor: "Mr. John Doe",
      date: "2023-08-28 16:30",
      type: "In-person",
    },
  ]);

  const [recentMessages] = useState([
    {
      id: 1,
      counsellor: "Dr. Sarah Smith",
      preview: "Thank you for our session yesterday...",
      unread: true,
    },
    {
      id: 2,
      counsellor: "Mr. John Doe",
      preview: "Looking forward to our meeting...",
      unread: false,
    },
  ]);

  const navigation = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      href: "#",
      current: activeTab === "dashboard",
    },
    {
      name: "My Sessions",
      icon: CalendarIcon,
      href: "#",
      current: activeTab === "sessions",
    },
    {
      name: "Messages",
      icon: ChatBubbleLeftIcon,
      href: "#",
      current: activeTab === "messages",
    },
    {
      name: "Profile",
      icon: UserIcon,
      href: "#",
      current: activeTab === "profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md text-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed md:relative md:translate-x-0 z-40 w-64 min-h-screen bg-white border-r border-gray-200 md:block"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              BetterWellness
            </Link>
          </div>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`${
                item.current
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              } group flex items-center px-3 py-3 rounded-lg transition-colors mb-1`}
            >
              <item.icon
                className={`${
                  item.current ? "text-blue-600" : "text-gray-500"
                } h-5 w-5 mr-3`}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="md:pl-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900 capitalize">
                {activeTab}
              </h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <div className="flex items-center">
                  <div className="mr-3">
                    <p className="text-sm font-medium text-gray-700">
                      Jane Cooper
                    </p>
                    <p className="text-xs text-gray-500">Customer</p>
                  </div>
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://via.placeholder.com/40"
                    alt="User avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="border-l-4 border-blue-600 pl-4 py-2"
                  >
                    <p className="font-medium text-gray-900">
                      {session.counsellor}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {session.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.unread
                        ? "bg-blue-50 border-l-4 border-blue-600"
                        : "bg-gray-50"
                    }`}
                  >
                    <p className="font-medium text-gray-900">
                      {message.counsellor}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {message.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Book New Session
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  View Counsellors
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Payment Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
