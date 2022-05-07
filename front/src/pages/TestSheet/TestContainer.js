import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import TestPresentation from "pages/TestSheet/TestPresentation";
import TestProcessBtn from "pages/TestSheet/TestProcessBtn";
import { NextBtn } from "styles/Test/TestStyle";
import { useTestQuery } from "queries/testQuery";
import { post } from "utils/api";

export default function TestContainer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState } = queryClient.getQueryData("userState");
  console.log(userState);
  const { tests } = useTestQuery();

  const [step, setStep] = useState(0);
  const [isProceedingTest, setIsProceedingTest] = useState(false);
  const [curAnswer, setCurAnswer] = useState({});
  const [totalMySelectedAnswer, setTotalMySelectedAnswer] = useState({});

  const MyselectedAnswer = (qustionId, answerId) => {
    setCurAnswer((cur) => {
      return {
        [qustionId]: answerId,
      };
    });
  };
  const selectedAnswer = curAnswer[step + 1] || null;

  const setNextQuestion = () => {
    setStep((cur) => cur + 1);
    setCurAnswer({});
    setTotalMySelectedAnswer((cur) => {
      return {
        ...cur,
        [Object.keys(curAnswer)[0]]: Object.values(curAnswer)[0],
      };
    });
  };

  const onSubmit = async () => {
    try {
      const res = await post(`tests/evaluate`, {
        userId: userState._id,
        submission: totalMySelectedAnswer,
      });
      console.log(res.status);
      queryClient.removeQueries("tests");
      navigate("/test/result", { state: { result: res.result } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {isProceedingTest && tests && (
        <TestPresentation
          test={tests[step]}
          selectedAnswer={selectedAnswer}
          MyselectedAnswer={MyselectedAnswer}
        />
      )}
      {!isProceedingTest && (
        <NextBtn
          onClick={() => {
            setIsProceedingTest(true);
          }}
        >
          테스트 시작하기!
        </NextBtn>
      )}
      {isProceedingTest && tests && (
        <TestProcessBtn
          step={step + 1}
          totalQuestion={tests.length}
          selectedAnswer={selectedAnswer}
          onSubmit={onSubmit}
          setNextQuestion={setNextQuestion}
        />
      )}
    </div>
  );
}
