import mongoose, { Schema, Document } from "mongoose";

export interface IUserDesignation extends Document {
  userId: mongoose.Types.ObjectId;
  designationId: mongoose.Types.ObjectId;
}

const userDesignationSchema = new Schema<IUserDesignation>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  designationId: { type: Schema.Types.ObjectId, ref: "Designation", required: true }
}, { timestamps: true });

const UserDesignation = mongoose.models.userDesignation || mongoose.model<IUserDesignation>("UserDesignation", userDesignationSchema);

export default UserDesignation 
