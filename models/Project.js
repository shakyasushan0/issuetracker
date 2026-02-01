import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Max allowed 500 characters only"],
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

projectSchema.pre("save", function () {
  if (!this.members.includes(this.createdBy)) {
    this.members.push(this.createdBy);
  }
});
const Project = mongoose.model("Project", projectSchema);
export default Project;
