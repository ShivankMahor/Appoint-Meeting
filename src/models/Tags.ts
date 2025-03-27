import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tagName: string;
}

const tagSchema = new Schema<ITag>({
  tagName: { type: String, required: true, unique: true }
});

const Tags = mongoose.models.Tags || mongoose.model<ITag>("Tag", tagSchema);

export default Tags
