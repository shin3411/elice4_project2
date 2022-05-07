import React, { useState } from "react";
import {
  SlideWrap,
  OverFlow,
  SlideContainer,
  SlideInner,
  SlideItem,
  PrevBtn,
  NextBtn,
} from "styles/Components/SlideStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const initTransition = "transform 0.5s";
export default function Slide({ elements }) {
  const [curIndex, setCurIndex] = useState(1);
  const [curTransition, setCurTransition] = useState(initTransition);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideX, setSlideX] = useState(null);
  const [prevSlideX, setPrevSlideX] = useState(false);
  const ORIGINSIZE = elements.length;
  const infiniteElements = [elements[ORIGINSIZE - 1], ...elements, elements[0]];
  const NEWSIZE = infiniteElements.length;

  // 스와이프 가능
  const getClientX = (event) => {
    return event._reactName === "onTouchStart"
      ? event.touches[0].clientX
      : event._reactName === "onTouchMove" || event._reactName === "onTouchEnd"
      ? event.changedTouches[0].clientX
      : event.clientX;
  };

  // 터치한 위치
  const handleTouchStart = (e) => {
    setPrevSlideX(() => getClientX(e));
  };
  // 터치 움직임
  const handleTouchMove = (e) => {
    if (prevSlideX) {
      setSlideX(() => getClientX(e) - prevSlideX);
    }
  };
  // 터치 움직임에 따라 curIndex 변경
  const handleMouseSwipe = (e) => {
    if (slideX) {
      const currentTouchX = getClientX(e);
      if (prevSlideX > currentTouchX + 100) {
        handleSlide(curIndex + 1);
      } else if (prevSlideX < currentTouchX - 100) {
        handleSlide(curIndex - 1);
      }
      setSlideX(() => null);
    }
    setPrevSlideX(() => null);
  };
  const handleSwipe = (direction) => {
    setIsSwiping(true);
    handleSlide(curIndex + direction);
  };
  // 맨 끝, 맨 처음 슬라이드 접근 시 트랜지션 효과 제거
  const replaceSlide = (index) => {
    setTimeout(() => {
      setCurTransition("0s");
      setCurIndex(index);
    }, 500);
  };
  // 맨 처음과 끝 슬라이드 접근 시 인덱스 변화
  const handleSlide = (index) => {
    setCurIndex(index);
    if (index <= 0) {
      index += ORIGINSIZE;
      replaceSlide(index);
    } else if (index - 2 >= ORIGINSIZE - 1) {
      index -= ORIGINSIZE;
      replaceSlide(index);
    }
    setCurTransition(initTransition);
  };

  return (
    <SlideWrap>
      <OverFlow>
        <SlideContainer
          w={`${NEWSIZE * 100}vw`}
          transform={`translate(${-100 * curIndex}vw)`}
          transition={curTransition}
          onMouseOver={() => setIsSwiping(true)}
          onMouseOut={() => setIsSwiping(false)}
        >
          {infiniteElements.map((e, index) => (
            <SlideInner
              key={index}
              onMouseDown={handleTouchStart}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseMove={handleTouchMove}
              onMouseUp={handleMouseSwipe}
              onTouchEnd={handleMouseSwipe}
              onMouseLeave={handleMouseSwipe}
            >
              <SlideItem>{e}</SlideItem>
            </SlideInner>
          ))}
        </SlideContainer>
      </OverFlow>
      <PrevBtn onClick={() => handleSwipe(-1)}>
        <ArrowBackIosIcon fontSize="large" />
      </PrevBtn>
      <NextBtn onClick={() => handleSwipe(1)}>
        <ArrowForwardIosIcon fontSize="large" />
      </NextBtn>
    </SlideWrap>
  );
}
