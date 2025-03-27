import mongoose, { Schema, Document } from "mongoose";

export interface IUserTag extends Document {
  userId: mongoose.Types.ObjectId;
  tagId: mongoose.Types.ObjectId;
}

const userTagSchema = new Schema<IUserTag>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true }
}, { timestamps: true });

const UserTag = mongoose.models.UserTag || mongoose.model<IUserTag>("UserTag", userTagSchema);

export default UserTag 
