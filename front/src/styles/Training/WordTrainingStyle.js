import styled from "styled-components";

export const WordTrainingContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

export const WordSuggestion = styled.h3`
  font-size: 18px;
  font-weight: lighter;
  margin-bottom: 10px;
`;
export const AnswerForm = styled.form`
  position: relative;
`;

export const AnswerInput = styled.input`
  background-color: transparent;
  border: solid 2px #c48f5a;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  padding: 0 6px;
  &:focus {
    outline: none;
  }
`;

export const AnswerBtn = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${(props) => props.color};
  position: absolute;
  right: 10px;
  top: 15px;
`;

export const WordMeaningBox = styled.div`
  margin-bottom: 20px;
`;

export const WordMeaning = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

export const ShowAnswerBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #445656;
  background-color: none;
  border: 2px solid #445656;
  border-radius: 30px;
  padding: 6px 12px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;

export const ConfirmBox = styled.p`
  text-align: left;
  padding: 3px;
  min-height: 30px;
`;

export const ProgressBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ProgressBar = styled.div`
  width: 200px;
  margin-right: 6px;
  border: 1px solid #c48f5a;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export const Progress = styled.div`
  width: ${(props) => props.width};
  height: 98%;
  border-radius: 10px;
  background-color: #c48f5a;
  transition: width 0.2s;
`;

export const ProgressPercent = styled.p`
  color: #c48f5a;
`;

export const ButtonBox = styled.div`
  min-width: 100px;
  margin-bottom: 40px;
  position: relative;
`;

export const Btn = styled.button`
  border: none;
  background: none;
  color: #c48f5a;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:disabled {
    color: #c4c4c4;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const PrevBtn = styled(Btn)`
  position: absolute;
  left: 0;
`;
export const NextBtn = styled(Btn)`
  position: absolute;
  right: 0;
`;

export const ClearBtn = styled(Btn)`
  border: 1px solid #c4c4c4;
  padding: 8px 10px;
  border-radius: 8px;
  color: #c4c4c4;
  &:hover {
    color: #c48f5a;
    border-color: #c48f5a;
  }
`;
