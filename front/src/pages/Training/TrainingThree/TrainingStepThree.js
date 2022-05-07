import React, { useState, useEffect } from "react";
import TrainingGuide from "pages/Training/TrainingGuide";
import Slide from "components/Slide/Slide";
import TrainingTransription from "./TrainingTransription";
import { TranscriptionDescription } from "./TranscriptionDescription";
import { TAG_NAME, CATEGORY } from "utils/constants";
import { useTranscriptionQuery } from "queries/transcriptionQuery";
import {
  TrainingSubjectContainer,
  TrainingSubjectWrap,
  TrainingStepTitle,
  ButtonWrap,
  FetchTranscriptionBtn,
  IndexBtnWrap,
  IndexBtn,
} from "styles/Training/TrainingStyle";
export default function TrainingStepThree() {
  const { isFetching, transcription } = useTranscriptionQuery();
  console.log(transcription);
  const [curIndex, setCurIndex] = useState(0);

  const fetchData = (index) => {
    setCurIndex((cur) => index);
  };
  return (
    <>
      {transcription && (
        <TrainingGuide>
          <TrainingSubjectContainer>
            <TrainingSubjectWrap>
              <TrainingStepTitle>3단계</TrainingStepTitle>
              <Slide elements={TranscriptionDescription} />
            </TrainingSubjectWrap>
          </TrainingSubjectContainer>
          <ButtonWrap>
            <IndexBtnWrap>
              {transcription?.map((_, i) => (
                <IndexBtn onClick={() => fetchData(i)} key={i}>
                  {i + 1}
                </IndexBtn>
              ))}
            </IndexBtnWrap>
            <FetchTranscriptionBtn>필사 불러오기</FetchTranscriptionBtn>
          </ButtonWrap>

          <TrainingTransription
            tags={TAG_NAME.STEP_THREE}
            subjectId={transcription[curIndex]._id}
            category={transcription[curIndex].category}
            subject={transcription[curIndex].subject}
          />
        </TrainingGuide>
      )}
    </>
  );
}
