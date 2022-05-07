import React from "react";
import TrainingStep from "./TrainingStep";
import { TrainingContainer } from "styles/Training/TrainingStyle";
import { dumy } from "./dumyData";

export default function Training() {
  return (
    <TrainingContainer>
      {dumy.map((d, i) => (
        <TrainingStep
          key={i}
          step={i + 1}
          img={d.stepImg}
          title={d.stepTitle}
          tag={d.stepTag}
          des={d.stepDescription}
        />
      ))}
    </TrainingContainer>
  );
}
