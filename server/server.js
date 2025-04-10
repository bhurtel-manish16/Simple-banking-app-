import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import SignUp from "./models/SignUp.js";
import UserTransInfo from "./models/UserTransInfo.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// SignUp Route
app.post("/signUp", async (req, res) => {
  const userId = uuidv4();

  try {
    // Create user
    const user = await SignUp.create({
      UserId: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date().toISOString(),
    });

    // Create initial transaction info
    await UserTransInfo.create({
      userId: userId,
      amount: 0,
      date: new Date().toISOString(),
    });

    console.log("User and transaction info created successfully");
    res.status(201).json(user);
  } catch (err) {
    console.error("Error during sign-up:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await SignUp.findOne({ email, password });
    if (!user) {
      console.error("Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("User found:", user);
    console.log("UserId being queried:", user.UserId);

    // Fetch user transaction info
    const userTransInfo = await UserTransInfo.find({ userId: user.UserId });
    if (!userTransInfo || userTransInfo.length === 0) {
      console.error("No transaction info found for UserId:", user.UserId);
      return res.status(404).json({ error: "User transaction info not found" });
    }

    console.log("User transaction info found:", userTransInfo);

    // Attach transaction info to the user object
    const userWithTransaction = {
      ...user.toObject(), // Convert Mongoose document to plain object
      transaction: userTransInfo,
    };
    res.status(200).json({ message: "Login was successful", user: userWithTransaction });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deposit Route
app.post("/deposit", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body for debugging
  const { userId, amount } = req.body; // Expect userId instead of id
  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid userId or amount" });
  }

  try {
    const user = await SignUp.findOne({ UserId: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const transaction = await UserTransInfo.create({
      userId: userId,
      amount: amount,
      date: new Date().toISOString(),
    });

    res.status(201).json({
      message: `Successfully deposited $${amount}`,
      transaction: transaction,
    });
  } catch (err) {
    console.error("Error during deposit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
