import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get } from "utils/api";
import { TEST_RESULT } from "utils/constants";
import {
  TestResultContainer,
  TestResultWrap,
  TestResultUserName,
  TestResultUserScore,
  TestResultUserRecommand,
  TestResultNavBtn,
} from "styles/Test/TestResultStyle";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQueryClient } from "react-query";

export default function TestResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { userState } = queryClient.getQueryData("userState");
  const [myScore, setMyScore] = useState(0);

  const isVisitor = userState._id === "visitor";
  const data = {
    nickname: isVisitor ? "visitor" : userState.nickname,
  };

  const recommendStep = (score) => {
    if (score >= 90) return TEST_RESULT.LEVEL_THREE;
    else if (score >= 70) return TEST_RESULT.LEVEL_TWO;
    return TEST_RESULT.LEVEL_ONE;
  };

  const handleClickNavBtn = (score) => {
    if (score >= 90) return 2;
    return 1;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      if (!isVisitor) {
        const res = await get(`users/${userState._id}/results`);
        setMyScore(res.data.result);
      }
    };
    fetchAPI();
  }, []);

  const userNavigate = () => {
    if (isVisitor) navigate(`/user/login`);
    else navigate(`/training/${handleClickNavBtn(myScore)}`);
  };

  return (
    <TestResultContainer>
      <TestResultWrap>
        <TestResultUserName>
          <mark>{data.nickname} </mark>님의 점수는
        </TestResultUserName>
        <TestResultUserScore>
          <mark>{isVisitor ? `${location.state.result}` : myScore}/100</mark>
          입니다!
        </TestResultUserScore>
        <TestResultUserRecommand>
          {recommendStep(isVisitor ? `${location.state.result}` : myScore)}
        </TestResultUserRecommand>
        <TestResultNavBtn onClick={userNavigate}>
          {isVisitor ? "로그인 하러가기" : "서비스 바로가기"}
          <ArrowForwardIcon />
        </TestResultNavBtn>
      </TestResultWrap>
    </TestResultContainer>
  );
}
