import React from "react";
import TestAnswerBtn from "pages/TestSheet/TestAnswerBtn";
import { TestContent, TestQuestion } from "styles/Test/TestStyle";
import { createMarkup } from "utils/setInnerHTML";

export default function TestPresentation({
  test,
  selectedAnswer,
  MyselectedAnswer,
}) {
  return (
    <>
      <TestQuestion>
        Q{test.num}. {test.question}
      </TestQuestion>
      <TestContent
        dangerouslySetInnerHTML={createMarkup(test.content)}
      ></TestContent>
      <TestAnswerBtn
        testId={test.num}
        choices={test.choices}
        selectedAnswer={selectedAnswer}
        MyselectedAnswer={MyselectedAnswer}
      />
    </>
  );
}
