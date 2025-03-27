import mongoose, { Schema, Document } from "mongoose";

export interface IUserMeeting extends Document {
  userId: mongoose.Types.ObjectId;
  guestId?: mongoose.Types.ObjectId;
  meetingId: mongoose.Types.ObjectId;
}

const userMeetingSchema = new Schema<IUserMeeting>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  guestId: { type: Schema.Types.ObjectId, ref: "Guest" },
  meetingId: { type: Schema.Types.ObjectId, ref: "Meeting", required: true }
}, { timestamps: true });

const UserMeetings = mongoose.models.UserMeetings || mongoose.model<IUserMeeting>("UserMeeting", userMeetingSchema);

export default UserMeetings
