import React, { useState, useContext } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext to get userId


const DepositSendMoney = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { user } = useContext(UserContext); // Access user from context
  const { setUser, setTransaction } = useContext(UserContext);
  const handleDeposit = async (e) => {
    e.preventDefault(); // Prevent default form submission
   console.log("User:", user); // Log the userId to check if it's available
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to deposit.");
      return;
    }
    if (!user || !user.UserId) {
      alert("User is not logged in. Please log in to deposit money.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/deposit", {
        userId: user.UserId, // Send userId in the request body
        amount: amount,
      });
      console.log(response.data);
      alert(`Successfully deposited $${amount}`);
      console.log("Tramsaction to save",response.data.transaction)
      setTransaction((prevTransaction) => [
        ...prevTransaction,
        response.data.transaction,
      ]); // Update transaction context with the new transaction
      setAmount(""); // Clear the input field
    } catch (error) {
      console.error("There was an error depositing money!", error);
      alert("Error depositing money. Please try again.");
    }
  };

  const handleSendMoney = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!amount || amount <= 0 || !recipient) {
      alert("Please enter a valid amount and recipient.");
      return;
    }
    if (!user || !user.UserId) {
      alert("User is not logged in. Please log in to send money.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/send-money", {
        userId: user.UserId, // Include userId in the request body
        amount: amount,
        recipient: recipient,
      });
      console.log(response.data);
      alert(`Successfully sent $${amount} to ${recipient}`);
      // Update transaction context with the new transaction
      setRecipient(""); // Clear the recipient field
    } catch (error) {
      console.error("There was an error sending money!", error);
      alert(
        error.response?.data?.error || "Error sending money. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar active="deposite" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Deposit and Send Money
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deposit Section */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Deposit Money</h2>
            <form onSubmit={handleDeposit}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
              >
                Deposit
              </button>
            </form>
          </div>

          {/* Send Money Section */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send Money</h2>
            <form onSubmit={handleSendMoney}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
              />
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
              >
                Send Money
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositSendMoney;