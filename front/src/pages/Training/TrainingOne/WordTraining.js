import React, { useState, useRef, useEffect } from "react";
import { useWordsQuery } from "queries/wordsQuery";
import { useQueryClient } from "react-query";
import {
  WordTrainingContainer,
  WordSuggestion,
  WordMeaning,
  ProgressBox,
  ProgressBar,
  Progress,
  AnswerInput,
  AnswerForm,
  AnswerBtn,
  ProgressPercent,
  WordMeaningBox,
  ConfirmBox,
  ButtonBox,
  PrevBtn,
  NextBtn,
  ClearBtn,
} from "styles/Training/WordTrainingStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { post, get } from "utils/api";
import { CONSONANT } from "utils/constants";

export default function WordTraining({ subject }) {
  const answerRef = useRef();
  const [progress, setProgress] = useState(0);
  const [curIndex, setCurIndex] = useState(progress);
  const [myAnswer, setMyAnswer] = useState("");
  const queryClient = useQueryClient();
  const { userState } = queryClient.getQueryData("userState");

  const { words } = useWordsQuery();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await get(`users/${userState._id}/userword`);
        setProgress((cur) => res.data.num);
        setCurIndex((cur) => res.data.num);
      } catch (e) {
        console.log("단어를 처음 보는 사람이라 0부터 시작합니다.");
      }
    };
    fetchApi();
  }, []);

  // next, prev 버튼
  const clickSetQuiz = (direction) => {
    setCurIndex((cur) => cur + direction);
    setMyAnswer((cur) => "");
    answerRef.current.innerHTML = "";
  };

  // 유저가 진행한 문제보다 뒤를 풀면 답이 나오게 출력, 아니라면 빈 칸으로 출력

  //input value 업데이트
  const handleChangeAnswer = (e) => {
    setMyAnswer((cur) => e.target.value);
  };
  //공백을 제거해서 답변으로 적어도 인정.
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (myAnswer === words[curIndex].word.replace(/(\s*)/g, "")) {
      answerRef.current.innerHTML = "<mark>정답입니다!<mark>";
      if (curIndex === progress) setProgress((cur) => cur + 1);
    } else answerRef.current.innerHTML = "틀렸습니다..";
  };

  const makeConsonant = (word) => {
    const 가 = 44032;
    const consonant = word.split("").map((w, index) => {
      const wordUniCode = w.charCodeAt(0) - 가;
      return parseInt(wordUniCode / 588);
    });
    return consonant.map((o, i) => CONSONANT[o]);
  };

  const stopWordTraining = async () => {
    try {
      await post("userwords", { word: words[progress - 1].word });
      alert("저장 되었습니다.");
    } catch (e) {}
  };

  return (
    <WordTrainingContainer>
      {words && (
        <>
          <WordMeaningBox>
            <WordMeaning>의미: {words[curIndex].meaning}</WordMeaning>
          </WordMeaningBox>
          <WordSuggestion>
            힌트: {makeConsonant(words[curIndex].word)}
          </WordSuggestion>
          <AnswerForm onSubmit={(e) => handleSubmitAnswer(e)}>
            <AnswerInput
              type="text"
              placeholder="정답을 입력해주세요.."
              value={myAnswer}
              onChange={(e) => handleChangeAnswer(e)}
            />
            <AnswerBtn
              color={myAnswer.length > 0 ? "#c48f5a" : "#c4c4c4"}
              onSubmit={(e) => handleSubmitAnswer(e)}
            >
              확인
            </AnswerBtn>
            <ConfirmBox ref={answerRef}></ConfirmBox>
          </AnswerForm>
          <ProgressBox>
            <ProgressBar>
              <Progress
                width={`${Math.ceil(((curIndex + 1) / words.length) * 100)}%`}
              />
            </ProgressBar>
            <ProgressPercent>
              {Math.ceil(((curIndex + 1) / words.length) * 100)}%
            </ProgressPercent>
          </ProgressBox>
          <ButtonBox>
            <PrevBtn disabled={curIndex === 0} onClick={() => clickSetQuiz(-1)}>
              <ArrowBackIosIcon fontSize="large" />
            </PrevBtn>
            <NextBtn
              onClick={() => clickSetQuiz(1)}
              disabled={curIndex === words.length - 1 || progress <= curIndex}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </NextBtn>
          </ButtonBox>
          <ClearBtn onClick={() => stopWordTraining()}>저장하기</ClearBtn>
        </>
      )}
    </WordTrainingContainer>
  );
}
