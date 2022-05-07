import is from "@sindresorhus/is";
import { Router } from "express";
import { resultService } from "../services/resultService";

const resultRouter = Router();

// create
// 전 : /result
// 후 : /results
resultRouter.post("/results", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { userId, result } = req.body;

    const userResult = await resultService.addResult({ userId, result });

    if(userResult.errorMessage){
      throw new Error(userResult.errorMessage);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// read
// 1. userId로 유저가 했던 결과 조회
// 전 : /results/:userId
// 후 : /users/:userId/results
resultRouter.get("/users/:userId/results", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const result = await resultService.getResultByUserId({ userId });

    if (result?.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 2. 전체 결과 조회
resultRouter.get("/results", async (req, res, next) => {
  try {
    const results = await resultService.getAllResults();

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

// 3. 결과 하나만 조회
// 전 : /result/:resultId
// 후 : /results/:resultId
resultRouter.get("/results/:resultId", async (req, res, next) => {
  try {
    const resultId = req.params.resultId;

    const result = await resultService.getResult({ resultId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// delete
// 1. userId로 유저가 했던 결과 삭제
// 전 : /results/:userId
// 후 : /users/:userId/results
resultRouter.delete("/users/:userId/results", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const deleteResult = await resultService.deleteResultByUserId({ userId });
    if(deleteResult.errorMessage){
      throw new Error(deleteResult.errorMessage);
    }

    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});

// 2. 결과 하나만 삭제
// 전 : /result/:resultId
// 후 : /results/:resultId
resultRouter.delete("/results/:resultId", async (req, res, next) => {
  try {
    const resultId = req.params.resultId;

    const deleteResult = await resultService.deleteResult({ resultId });
    if(deleteResult.errorMessage){
      throw new Error(deleteResult.errorMessage);
    }

    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});

export { resultRouter };
