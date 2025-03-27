import mongoose, { Schema, Document } from "mongoose";

export interface IDesignation extends Document {
  designationName: string;
}

const designationSchema = new Schema<IDesignation>({
  designationName: { type: String, required: true, unique: true }
});

const Designation = mongoose.models.Designation || mongoose.model<IDesignation>("Designation", designationSchema); 

export default Designation
