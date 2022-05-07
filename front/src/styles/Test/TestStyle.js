import styled from "styled-components";
import { img } from "utils/imgImport";

export const ContainerHome = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 0 auto;
  margin: 100px 0;
`;

export const WomanBook = styled.img.attrs({
  src: img.womanBook,
  alt: "책을 들고 있는 여자",
})`
  width: 300px;
  height: 400px;
  margin-bottom: 30px;
`;

export const TestQuestion = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  color: #c48f5a;
  margin-bottom: 0.75rem;
`;
export const TestContent = styled.p`
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
`;
export const AnswerBtnContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;
export const AnswerBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #c48f5a;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(195, 202, 254, 0.6);
  border-radius: 3px;
  margin-bottom: 0.75rem;
  padding: 10px;
  font-size: 1.2rem;
`;

export const AnswerText = styled.p`
  line-height: 20px;
  text-align: left;
`;

export const ProcessContainer = styled.section`
  text-align: center;
`;

export const NextBtn = styled.button`
  width: 140px;
  height: 34px;
  background: #c48f5a;
  border: 1px solid #c48f5a;
  box-sizing: border-box;
  border-radius: 30px;
  color: #ffffff;
  text-align: center;
  box-shadow: 3px 3px 3px gray;
  transition-duration: 0.3s;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, gray);
  }
`;
