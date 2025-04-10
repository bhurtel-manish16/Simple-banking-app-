import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ active }) => {
  const [isNightMode, setIsNightMode] = useState(false); // State to toggle night mode

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div
      className={`w-1/4 p-6 ${
        isNightMode ? "bg-gray-800 text-gray-200" : "bg-violet-500 text-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Banking App</h2>
      <ul className="space-y-4">
        <Link to="/home">
          <li
            className={`p-2 rounded-lg cursor-pointer ${
              active === "dashboard"
                ? isNightMode
                  ? "bg-gray-700"
                  : "bg-violet-400"
                : "hover:bg-violet-600"
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link to="/transactions">
          <li
            className={`p-2 rounded-lg cursor-pointer ${
              active === "deposite"
                ? isNightMode
                  ? "bg-gray-700"
                  : "bg-violet-300"
                : "hover:bg-violet-600"
            }`}
          >
            Deposit and Send Money
          </li>
        </Link>
        <li
          className={`p-2 rounded-lg cursor-pointer ${
            active === "accounts"
              ? isNightMode
                ? "bg-gray-700"
                : "bg-violet-300"
              : "hover:bg-violet-600"
          }`}
        >
          Accounts
        </li>
        <li
          className={`p-2 rounded-lg cursor-pointer ${
            active === "settings"
              ? isNightMode
                ? "bg-gray-700"
                : "bg-violet-300"
              : "hover:bg-violet-600"
          }`}
        >
          Settings
        </li>
        <li
          className={`p-2 rounded-lg cursor-pointer ${
            active === "logout"
              ? isNightMode
                ? "bg-gray-700"
                : "bg-violet-300"
              : "hover:bg-violet-600"
          }`}
        >
          Logout
        </li>
      </ul>

      {/* Night Mode Toggle */}
      <div className="mt-6">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-sm">
            {isNightMode ? "Night Mode" : "Day Mode"}
          </span>
          <div
            className={`relative w-12 h-6 rounded-full ${
              isNightMode ? "bg-gray-600" : "bg-gray-300"
            }`}
            onClick={toggleNightMode}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isNightMode ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SideBar;