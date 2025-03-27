import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "GUEST" | "USER" | "ADMIN";
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: String, enum: ["GUEST", "USER", "ADMIN"], default: "USER" },
}, { timestamps: true });

// Ensure we only create the model once
const User = models.User || model<IUser>("User", userSchema);

export default User;
