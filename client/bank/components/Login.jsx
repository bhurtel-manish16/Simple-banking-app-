import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser, setTransaction } = useContext(UserContext); // Access setTransaction from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const userName = response.data.user.name;
        const userEmail = response.data.user.email;
        const userId = response.data.user.UserId; // Get user ID from the response
        console.log("userId",userId);
        const transactions = response.data.user.transaction; // Get transaction data from the response
        console.log("hello",transactions);
        if (!userName || !userEmail) {
          console.error("User data not found in the response.");
          alert("Invalid credentials. Please try again.");
          return;
        }
        console.log("Transactions", transactions);
        console.log("Login was successful:", transactions);
        setUser({ name: userName, email: userEmail, UserId:userId }); // Update user context
        setTransaction(transactions); // Update transaction context
        navigate("/home");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        alert("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Log In to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-violet-500 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-violet-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
