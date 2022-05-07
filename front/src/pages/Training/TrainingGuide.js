import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrainingGuideContainer,
  TrainingGuideContent,
  BackBtn,
} from "styles/Training/TrainingStyle";
import { FlexBoxCenter } from "styles/Components/CommonStyle";

export default function TrainingGuide({ children }) {
  const navigate = useNavigate();
  return (
    <TrainingGuideContainer>
      <TrainingGuideContent>{children}</TrainingGuideContent>
      <FlexBoxCenter>
        <BackBtn onClick={() => navigate("/main")}>목록으로</BackBtn>
      </FlexBoxCenter>
    </TrainingGuideContainer>
  );
}
