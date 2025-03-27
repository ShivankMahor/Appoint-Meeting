import mongoose, { Schema, Document } from "mongoose";

export interface IMeeting extends Document {
  motive: string;
  approverId?: mongoose.Types.ObjectId;
  status: string;
  scheduleTime: Date;
  requestedTime: Date;
  createdAt?: Date;
}

const meetingSchema = new Schema<IMeeting>({
  motive: { type: String, required: true },
  approverId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" },
  scheduleTime: { type: Date, required: true },
  requestedTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.models.Meeting || mongoose.model<IMeeting>("Meeting", meetingSchema);

export default Meeting
