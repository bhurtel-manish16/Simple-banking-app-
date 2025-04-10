import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import SideBar from "./SideBar";

const Home = () => {
  const { user, transaction } = useContext(UserContext); // Access user and transaction information from context

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBar active="dashboard"/>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user?.name || "User"}!
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Account Information
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold">Name:</span> {user?.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Account number:</span> {user?.id || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Account Balance:</span> {transaction?.length > 0 ? `$${transaction[transaction.length-1].amount}` : "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Transaction Information
          </h2>
          {transaction && transaction.length > 0 ? (
            <ul>
              {transaction.map((trans, index) => (
                <li key={index} className="text-gray-600">
                  <span className="font-bold">Amount:</span> ${trans.amount} -{" "}
                  <span className="font-bold">Date:</span> {new Date(trans.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;