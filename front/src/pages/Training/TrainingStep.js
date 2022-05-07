import React from "react";
import { useNavigate } from "react-router-dom";
import {
  StepContainer,
  StepImg,
  StepTitle,
  StepTagContainer,
  StepTag,
  StepDescription,
} from "styles/Training/TrainingStyle";

export default function TrainingStep({ step, img, title, tag, des }) {
  const navigate = useNavigate();
  return (
    <StepContainer onClick={() => navigate(`/training/${step}`)}>
      <StepImg src={img} alt="훈련 대표 이미지" />
      <StepTitle>{title}</StepTitle>
      <StepTagContainer>
        {tag.map((tag, i) => (
          <StepTag key={i}>{tag}</StepTag>
        ))}
      </StepTagContainer>

      <StepDescription>{des}</StepDescription>
    </StepContainer>
  );
}
