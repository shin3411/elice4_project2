import { Quiz } from "../db";
import { isEmptyArray } from "../utils/validation/isEmptyType";

class quizService{
    static async getQuizzes(){
        const quizzes = await Quiz.findAll();
        if(isEmptyArray(quizzes) === true){
            const errorMessage = "DB에 저장된 quiz 데이터가 없습니다.(back-error)";
            return { errorMessage };
        }

        return quizzes;
    }

    static async getQuizByWord({ word }){
        const quiz = await Quiz.findByWord({ word });
        if(!quiz){
            const errorMessage = "해당 단어에 대한 퀴즈 데이터가 없습니다.";
            return { errorMessage }; 
        }
        return quiz;
    }
}

export { quizService };