import { Schema, model } from "mongoose";

const SubjectSchema = new Schema(
  {
    subject: { type: String, required: true, },
    level: { type: Number, required: true, index: true, },
    category: { type: String, required: false, default: "" },
    point: { type: Number, required: true,},
  },
  {
    timestamps: true,
  }
);

const SubjectModel = model("Subject", SubjectSchema);

export { SubjectModel };
