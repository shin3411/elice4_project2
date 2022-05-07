import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TrainingGuideContainer,
  TrainingGuideContent,
  BackBtn,
} from "styles/Training/TrainingStyle";
import { FlexBoxCenter } from "styles/Components/CommonStyle";

export default function TrainingGuide({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOne = location.pathname === "/training/1";
  return (
    <TrainingGuideContainer>
      <TrainingGuideContent>{children}</TrainingGuideContent>
      {!isOne && (
        <FlexBoxCenter>
          <BackBtn onClick={() => navigate("/main")}>목록으로</BackBtn>
        </FlexBoxCenter>
      )}
    </TrainingGuideContainer>
  );
}
