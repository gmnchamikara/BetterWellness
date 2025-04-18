"use client";

import React from "react";
import LogoutButton from "./LogoutButton";

interface DashboardHeaderProps {
  currentUser: {
    fullname: string;
    profilePicture?: string;
  } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
  return (
    <div className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
            <span className="text-sm font-medium text-red-500">Sign In</span>
          )}
        </div>
      </div>

      <LogoutButton />
    </div>
  );
};

export default DashboardHeader;
