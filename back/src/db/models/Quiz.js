import { QuizModel } from "../schemas/quiz";

class Quiz{
    static async create({ newQuiz }) {
        const newCreatedQuiz = await QuizModel.create(newQuiz);
        return newCreatedQuiz;
    }
    
    static async findByNum({ num }){
        const quiz = await QuizModel.findOne({ num }, {__v:0}).lean();
        return quiz;
    }
    
    static async findByWord({ word }){
        const quiz = await QuizModel.findOne({ word }, {__v: 0}).lean();
        return quiz;
    }

    static async findAll(){
        const quizzes = await QuizModel.find({},{ num: 1, word: 1, meaning: 1}).lean();
        return quizzes;
    }
}

export { Quiz }