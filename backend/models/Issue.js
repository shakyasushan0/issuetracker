import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN-PROGRESS", "REVIEW", "BLOCKED", "COMPLETED"],
      uppercase: true,
      default: "TODO",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["normal", "low", "high", "critical"],
      default: "normal",
      lowercase: true,
    },
    storyPoint: {
      type: Number,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    attachment: {
      type: String,
    },
  },
  { timestamps: true },
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
