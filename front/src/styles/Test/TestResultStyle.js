import styled from "styled-components";
import { FlexBoxCenter } from "styles/Components/CommonStyle";

export const TestResultContainer = styled(FlexBoxCenter)`
  width: 100%;
  height: 30vh;
  flex-direction: column;
  text-align: center;
  line-height: 1.5;
`;

export const TestResultWrap = styled.div``;

export const TestResultUserName = styled.h2`
  font-size: 1.8rem;
  text-align: left;
  margin-bottom: 10px;
`;

export const TestResultUserScore = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const TestResultUserRecommand = styled.p`
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

export const TestResultNavBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1.2rem;
  padding: 4px 0;
  border-radius: 20px;
  &:hover {
    color: #ffffff;
    background-color: #c48f5a;
    transform: scale(1.1);
  }
`;
