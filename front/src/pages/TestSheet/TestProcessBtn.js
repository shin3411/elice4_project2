import React from "react";
import { ProcessContainer, NextBtn } from "styles/Test/TestStyle";

export default function TestProcessBtn({
  step,
  totalQuestion,
  setNextQuestion,
  selectedAnswer,
  onSubmit,
}) {
  return (
    <ProcessContainer>
      {totalQuestion !== step ? (
        <NextBtn
          disabled={!selectedAnswer}
          onClick={() => {
            setNextQuestion();
          }}
        >
          next
        </NextBtn>
      ) : (
        <NextBtn disabled={false} onClick={onSubmit}>
          결과보기!
        </NextBtn>
      )}
    </ProcessContainer>
  );
}
