import { Schema, model } from "mongoose";

const ChartSchema = new Schema(
  {
    data: [{ type: Object, required: true }]
  },
  {
    timestamps: true,
  }
);

const ChartModel = model("Chart", ChartSchema);

export { ChartModel };