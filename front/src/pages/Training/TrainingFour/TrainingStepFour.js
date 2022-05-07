import React, { useState, useEffect } from "react";
import TrainingGuide from "pages/Training/TrainingGuide";
import {
  TrainingSubjectContainer,
  TrainingStepTitle,
  TrainingSubjectWrap,
  TrainingStepIntroduction,
} from "styles/Training/TrainingStyle";
import TrainingPost from "../TrainingPost/TrainingPost";
import { TAG_NAME, TRAINING_INTRODUNCTION } from "utils/constants";
import { createMarkup } from "utils/setInnerHTML";
import { get } from "utils/api";
export default function TrainingStepFour() {
  const [subject, setSubject] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const res = await get(`subjects/?level=4`);
      setSubject((cur) => res.data);
    };
    fetchApi();
  }, []);
  return (
    <TrainingGuide>
      <TrainingSubjectContainer>
        <TrainingSubjectWrap>
          <TrainingStepTitle>4단계</TrainingStepTitle>
          <TrainingStepIntroduction
            dangerouslySetInnerHTML={createMarkup(
              TRAINING_INTRODUNCTION.STEP_FOUR
            )}
          />
        </TrainingSubjectWrap>
      </TrainingSubjectContainer>
      <TrainingPost
        title="요약"
        tags={TAG_NAME.STEP_THREE}
        subjectId={subject.subjectId}
        category={subject.category}
      />
    </TrainingGuide>
  );
}
