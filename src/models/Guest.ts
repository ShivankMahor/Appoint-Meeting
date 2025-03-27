import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "GUEST";
}

const guestSchema = new Schema<IGuest>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["GUEST"], default: "GUEST" }
}, { timestamps: true });

const Guest = mongoose.models.Guest || mongoose.model<IGuest>("Guest", guestSchema);

export default Guest
