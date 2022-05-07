import { quizService } from "../services/quizService";
import { Router } from "express";

const quizRouter = Router();

// read 
// 전체 퀴즈 문항 조회
quizRouter.get("/quizzes", async (req, res, next) => {
    try{
        const quizzes = await quizService.getQuizzes();
        if(quizzes.errorMessage){
            res.status(500).json({ errorMessage: quizzes.errorMessage });
            return;
        }
        
        res.status(200).json(quizzes);
    } catch(error) {
        next(error);
    }
})

export { quizRouter };