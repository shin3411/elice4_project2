import React, { useState, useEffect } from "react";
import TrainingGuide from "pages/Training/TrainingGuide";

import {
  TrainingSubjectContainer,
  TrainingSubjectWrap,
  TrainingStepTitle,
  TrainingStepIntroduction,
} from "styles/Training/TrainingStyle";
import TrainingPost from "../TrainingPost/TrainingPost";
import { TAG_NAME, TRAINING_INTRODUNCTION } from "utils/constants";
import { createMarkup } from "utils/setInnerHTML";
import { get } from "utils/api";

export default function TrainingStepTwo() {
  const [subject, setSubject] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const res = await get(`subjects/?level=2`);
      setSubject((cur) => res.data);
    };
    fetchApi();
  }, []);
  return (
    <TrainingGuide>
      <TrainingSubjectContainer>
        <TrainingSubjectWrap>
          <TrainingSubjectWrap>
            <TrainingStepTitle>2단계</TrainingStepTitle>
            <TrainingStepIntroduction
              dangerouslySetInnerHTML={createMarkup(
                TRAINING_INTRODUNCTION.STEP_TWO
              )}
            />
          </TrainingSubjectWrap>
        </TrainingSubjectWrap>
      </TrainingSubjectContainer>
      <TrainingPost
        tags={TAG_NAME.STEP_TWO}
        subject={subject.subject}
        category={subject.category}
      />
    </TrainingGuide>
  );
}
