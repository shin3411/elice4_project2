import is from "@sindresorhus/is";
import { Router } from "express";
import { testService } from "../services/testService";
import { resultService } from "../services/resultService";
import { loginRequired } from "../middlewares/loginRequired";

const testRouter = Router();

// create
// 1. 테스트 제출 => 점수 반환
// 전 : /test/result
// 후 : /tests/evaluate
testRouter.post("/tests/evaluate", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const userId = req.body.userId;
    const submission = req.body.submission;

    const score = await testService.evaluateTest(submission);
    if (score.errorMessage) {
      console.error("\x1b[35m%s\x1b[0m", score.errorMessage);
      res.status(500).json({success: false, errorMessage: score.errorMessage});
      return;
    }

    if (userId === "visitor") {
      res.status(200).json(score);
      return;
    }
    
    const userResult = await resultService.addResult({ userId, result: score.result });

    if(userResult.errorMessage){
      console.error("\x1b[35m%s\x1b[0m", userResult.errorMessage);
      res.status(500).json({success: false, errorMessage: `${score.errorMessage}(back-error)`});
      return;      
    }

    res.status(200).json(score);
  } catch (error) {
    next(error);
  }
});

// 2. 테스트 문항 생성
// 전 : /test
// 후 : /tests
testRouter.post("/tests", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const num = req.body.num;
    const question = req.body.question;
    const questionType = req.body.questionType;
    const content = req.body.content;
    const choices = req.body.choices;
    const answer = req.body.answer;

    const test = await testService.addTest({
      num,
      question,
      questionType,
      content,
      choices,
      answer,
    });

    if (test.errorMessage) {
      throw new Error(test.errorMessage);
    }

    res.status(200).json(test);
  } catch (error) {
    next(error);
  }
});

// read
// 1. 전체 테스트 문항 조회
testRouter.get("/tests", async (req, res, next) => {
  try {
    const question = req.query.question;

    const tests = await testService.searchTest({ question });

    res.status(200).json(tests);
  } catch (error) {
    next(error);
  }
});

// 2. 테스트 문항 조회(by 번호)
// 전 : /test/:num
// 후 : /tests/:num
testRouter.get("/tests/:num", async (req, res, next) => {
  try {
    const num = req.params.num;

    const test = await testService.getTest({ num });
    if (test.errorMessage) {
      throw new Error(test.errorMessage);
    }

    res.status(200).json(test);
  } catch (error) {
    next(error);
  }
});

// update
// 1. 테스트 문항 수정
// 전 : /test/:num
// 후 : /tests/:num
testRouter.put("/tests/:num", async (req, res, next) => {
  try {
    if(is.emptyObject(req.body)){
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
    }

    const num = req.params.num;
    const { question, questionType, content, choices } = req.body;
    const toUpdate = { question, questionType, content, choices };

    const test = await testService.setTest({ num, toUpdate });
    if (test.errorMessage) {
      throw new Error(test.errorMessage);
    }

    res.status(200).json(test);
  } catch (error) {
    next(error);
  }
});

// delete
// 1. 테스트 문항 삭제
// 전 : /test/:num
// 후 : /tests/:num
testRouter.delete("/tests/:num", async (req, res, next) => {
  try {
      const num = req.params.num;

      const deleteResult = await testService.deleteTest({ num });
      if(deleteResult.deletedCount !== 1){
          throw new Error("정상적으로 삭제되지 않았습니다.");
      }

      res.status(200).send({ success: true, });

  } catch (error) {
      next(error);
  }
});

export { testRouter };