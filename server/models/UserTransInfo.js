import mongoose from "mongoose";

const userTransInfoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now.toString },
})

const UserTransInfo = mongoose.model("UserTransInfo", userTransInfoSchema);
export default UserTransInfo;