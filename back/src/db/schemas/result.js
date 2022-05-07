import { Schema, model } from "mongoose";

const ResultSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    result: { type: Number, required: true, default: 0},
  },
  {
    timestamps: true,
  }
);

const ResultModel = model("Result", ResultSchema);

export { ResultModel };
