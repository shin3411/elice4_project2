import { Schema, model } from "mongoose";

const Quiz = new Schema(
    {
        num: {type: Number, required: true, },
        word: {type: String, required: true, },
        meaning: {type: String, required: true, },
    },
    {
        timestamps: true,
    }
)

const QuizModel = model('Quiz', Quiz);

export { QuizModel };