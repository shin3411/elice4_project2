import React from "react";

import { TrainingStepIntroduction } from "styles/Training/TrainingStyle";
import { TRANSCRIPTION_INTRODUCTION } from "utils/constants";
import { createMarkup } from "utils/setInnerHTML";

export const TranscriptionDescription = [
  <TrainingStepIntroduction
    dangerouslySetInnerHTML={createMarkup(TRANSCRIPTION_INTRODUCTION.STEP_ONE)}
  />,
  <TrainingStepIntroduction
    dangerouslySetInnerHTML={createMarkup(TRANSCRIPTION_INTRODUCTION.STEP_TWO)}
  />,
  <TrainingStepIntroduction
    dangerouslySetInnerHTML={createMarkup(
      TRANSCRIPTION_INTRODUCTION.STEP_THREE
    )}
  />,
  <TrainingStepIntroduction
    dangerouslySetInnerHTML={createMarkup(TRANSCRIPTION_INTRODUCTION.STEP_FOUR)}
  />,
];
