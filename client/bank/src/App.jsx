import React from "react";
import Singup from "../components/Singup";
import Login from "../components/Login";
import Home from "../components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";
import DepositSendMoney from "../components/DepositSendMoney.jsx";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<DepositSendMoney />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;