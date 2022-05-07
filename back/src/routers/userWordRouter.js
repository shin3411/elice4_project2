import { userWordService } from "../services/userWordService";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { isValidData, invalidCallback } from "../middlewares/validationMiddleware";

const userWordRouter = Router();

// create
// 현재 로그인한 유저가 단어 퀴즈를 어디까지 했는지 알기 위해 단어를 DB에 저장한다.
userWordRouter.post(
  "/userwords",
  loginRequired,
  isValidData("userword-post"),
  invalidCallback,
  async (req, res, next) => {
      try{
        const { word } = req.body;
        const userId = req.currentUserId;
        const userWord = await userWordService.addOrUpdateUserWord({ userId, word });

        res.status(200).json({ message: "success", userWord });
      } catch(error) {
        next(error);
      }
  }
);

// read
// 유저의 퀴즈 단어 조회
// 전 : /userword/:userId
// 후 : /users/:userId/userword
userWordRouter.get(
  "/users/:userId/userword",
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userWord = await userWordService.getUserWord({ userId });

      res.status(200).json(userWord);
    } catch (error) {
      next(error);
    }
  }
);

export { userWordRouter };