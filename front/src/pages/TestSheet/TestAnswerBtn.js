import React from "react";
import {
  AnswerBtn,
  AnswerText,
  AnswerBtnContainer,
} from "styles/Test/TestStyle";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function TestAnswerBtn({
  testId,
  choices,
  selectedAnswer,
  MyselectedAnswer,
}) {
  return (
    <AnswerBtnContainer>
      {choices &&
        Object.entries(choices).map((option, index) => (
          <AnswerBtn
            key={index}
            onClick={() => {
              MyselectedAnswer(testId, option[0]);
            }}
          >
            <AnswerText>
              {index + 1}. {option[1]}
            </AnswerText>
            {selectedAnswer === option[0] && (
              <FavoriteIcon style={{ color: "#C48F5A" }} />
            )}
          </AnswerBtn>
        ))}
    </AnswerBtnContainer>
  );
}
