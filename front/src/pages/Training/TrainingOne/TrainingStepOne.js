import React, { useState, useEffect } from "react";
import WordTraining from "pages/Training/TrainingOne/WordTraining";
import TrainingGuide from "pages/Training/TrainingGuide";
import {
  TrainingSubjectContainer,
  TrainingStepTitle,
  TrainingSubjectWrap,
  TrainingStepIntroduction,
} from "styles/Training/TrainingStyle";
import { TRAINING_INTRODUNCTION } from "utils/constants";
import { createMarkup } from "utils/setInnerHTML";
import { get } from "utils/api";

function TrainingStepOne() {
  const [subject, setSubject] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const res = await get(`subjects/?level=1`);
      setSubject(res.data);
    };
    fetchApi();
  }, []);
  return (
    <TrainingGuide>
      <TrainingSubjectContainer>
        <TrainingSubjectWrap>
          <TrainingStepTitle>1단계</TrainingStepTitle>
          <TrainingStepIntroduction
            dangerouslySetInnerHTML={createMarkup(
              TRAINING_INTRODUNCTION.STEP_ONE
            )}
          />
        </TrainingSubjectWrap>
      </TrainingSubjectContainer>
      <WordTraining subject={subject} />
    </TrainingGuide>
  );
}

export default TrainingStepOne;
