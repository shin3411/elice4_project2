import { Schema, model } from 'mongoose';
import { quizzes } from "../../load/data/quiz";

const UserWordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User"},
    word: { type: String, required: true, default: quizzes[0].word },
  },
  {
    timestamps: true,
  }
);

const UserWordModel = model("UserWord", UserWordSchema);

export { UserWordModel };