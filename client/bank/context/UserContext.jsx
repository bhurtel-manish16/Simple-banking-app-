import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage if it exists
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [transaction, setTransaction] = useState(() => {
    // Retrieve transaction data from localStorage if it exists
    const savedTransaction = localStorage.getItem("transaction");
    return savedTransaction ? JSON.parse(savedTransaction) : null;
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (user && transaction) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("transaction", JSON.stringify(transaction));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("transaction");
    }
  }, [user, transaction]);

  return (
    <UserContext.Provider value={{ user, setUser,transaction, setTransaction }}>
      {children}
    </UserContext.Provider>
  );
};

