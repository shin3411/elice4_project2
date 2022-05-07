import { useRef, useEffect, useState } from "react";
import Slide from "components/Slide/Slide";
import { Img } from "styles/Components/ComponentStyle";
import {
  HomeContainer,
  FullBanner,
  Homepage,
  Dot,
  DotsBox,
  Dots,
  HomeTitle,
  HomeContents,
  TextContent,
  TextTitle,
  TextParagraph,
  TextEmphasize,
  Quote,
  GraphBox,
} from "styles/Home/HomeStyle";
import { img } from "utils/imgImport";

import PisaTop15BarCountries from "./PisaTop15Countries";
import PisaGdpScatter from "./PisaGdpScatter";
import PisaEmployee from "./PisaEmployee";
import PisaSubjectScoreBar from "./PisaSubjectsScoreBar";

const BANNERS = [
  <Img url={img.banner1} alt={"banner1"} />,
  <Img url={img.banner2} alt={"banner2"} />,
  <Img url={img.banner3} alt={"banner3"} />,
];

function Home() {
  const fullpageRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);

  const dotsRef = useRef();
  const dotsLength = fullpageRef.current?.childNodes.length;
  const dotsIndex = Array.from({ length: dotsLength - 1 }, (_, i) => i + 1);

  const wheelHandler = (e) => {
    e.preventDefault();
    const { deltaY } = e;
    const { scrollTop } = fullpageRef.current;
    const pageHeight = window.innerHeight;

    if (deltaY > 0) {
      // 스크롤 내릴때
      if (scrollTop >= 0 && scrollTop < pageHeight) {
        // 0 -> 1
        scroll(pageHeight);
        setScrollIndex(2);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        // // 1 -> 2
        scroll(scrollTop + pageHeight);
        setScrollIndex(3);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
        // 2 -> 3
        scroll(scrollTop + pageHeight);
        setScrollIndex(4);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
        // 3 -> 4
        scroll(scrollTop + pageHeight);
        setScrollIndex(5);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 4 && scrollTop < pageHeight * 5) {
        // 4 -> 5
        scroll(scrollTop + pageHeight);
        setScrollIndex(6);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 5 && scrollTop < pageHeight * 6) {
        // 5 -> 6
        scroll(scrollTop + pageHeight);
        setScrollIndex(7);
        console.log(scrollTop);
      }
    } else {
      // 스크롤 올릴때
      if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        // 1 -> 0
        scroll(0);
        setScrollIndex(1);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
        // 2 -> 1
        scroll(pageHeight);
        setScrollIndex(2);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
        // 3 -> 2
        scroll(pageHeight * 2);
        setScrollIndex(3);
        console.log(scrollTop);
      } else if (
        scrollTop >= pageHeight * 4 &&
        scrollTop < pageHeight * 5 - 80
      ) {
        // 4 -> 3
        scroll(pageHeight * 3);
        setScrollIndex(4);
        console.log(scrollTop);
      } else if (
        scrollTop >= pageHeight * 5 - 80 &&
        scrollTop < pageHeight * 6 - 80
      ) {
        // 5 -> 4
        scroll(pageHeight * 4);
        setScrollIndex(5);
        console.log(scrollTop);
      } else if (scrollTop >= pageHeight * 6 - 80) {
        // 6 -> 5
        scroll(pageHeight * 5);
        setScrollIndex(6);
        console.log(scrollTop);
      }
    }
  };

  const scroll = (top) => {
    fullpageRef.current.scrollTo({
      top: top,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (window.innerWidth > 1300) {
      const fullPageRefCurrent = fullpageRef.current;
      fullPageRefCurrent?.addEventListener("wheel", wheelHandler);
      return () => {
        fullPageRefCurrent?.removeEventListener("wheel", wheelHandler);
      };
    }
  }, []);

  return (
    <HomeContainer ref={fullpageRef}>
      <FullBanner>
        <Slide elements={BANNERS} />
      </FullBanner>
      <DotsBox>
        <Dots ref={dotsRef}>
          {dotsIndex.map((index) => {
            return (
              <Dot key={index} num={index} scrollIndex={scrollIndex}></Dot>
            );
          })}
        </Dots>
      </DotsBox>
      <Homepage>
        <HomeTitle>
          <TextEmphasize>PISA</TextEmphasize> 란 ?
        </HomeTitle>
        <HomeContents>
          <TextContent>
            <TextTitle>
              <TextEmphasize>PISA</TextEmphasize>란 OECD 국제 학력평가
              프로그램입니다.
              <Quote>
                {" "}
                &nbsp; -> Programme for International Student Assessment.
              </Quote>
            </TextTitle>

            <TextParagraph>
              3년에 한번씩 95개 국가의 15세 아동을 대상으로 실생활의 문제를
              해결하는 <TextEmphasize>읽기, 수학, 과학</TextEmphasize> 능력을
              측정합니다.
            </TextParagraph>
            <TextParagraph>
              시험 형식이 정말 실생활에 사용되는 문제라는 게 기존의 시험과
              달라요.
            </TextParagraph>
            <TextParagraph>
              PISA의 창시자는 데이터를 통해
              <TextEmphasize> 더 나은 교육</TextEmphasize>을 제공하고, 학생이
              미래에 <TextEmphasize>경제 활동</TextEmphasize>을 잘 할 수 있는지
              알아보기 위해 PISA를 만들었다고 합니다.
            </TextParagraph>
          </TextContent>
          <GraphBox>
            <img
              alt="pisa"
              style={{ borderRadius: 10, width: 400 }}
              src={`${process.env.PUBLIC_URL}/assets/img/pisa_world.webp`}
            ></img>
          </GraphBox>
        </HomeContents>
      </Homepage>
      <Homepage>
        <HomeTitle>
          당신의 <TextEmphasize>문해력</TextEmphasize> 건강하십니까?
        </HomeTitle>
        <HomeContents>
          <TextContent>
            <TextTitle>여러 나라의 PISA 점수 어떻게 변하고 있을까요?</TextTitle>
            <TextParagraph>
              2006년부터 2018년까지 PISA 평균점수가 가장 높은
              <TextEmphasize> 15개 국가의 </TextEmphasize> 데이터를 연도별로
              뽑아봤습니다.
            </TextParagraph>
            <TextParagraph>
              다른 나라들의 PISA 점수가 평균적으로{" "}
              <TextEmphasize>0.492%</TextEmphasize> 하락한 반면에,
              <TextParagraph>
                <TextEmphasize> 한국</TextEmphasize>은
                <TextEmphasize> 7.554% 하락</TextEmphasize>하여 다른나라에 비해
                점수가 현저하게 <TextEmphasize> 떨어졌습니다. </TextEmphasize>
              </TextParagraph>
            </TextParagraph>
            <TextParagraph>
              나라별 PISA 점수를 확인해보세요.{" "}
              <TextParagraph>
                국기를 선택하시면 각 나라의 PISA 점수를 연도별로 확인할 수
                있어요.
              </TextParagraph>
            </TextParagraph>
          </TextContent>
          <GraphBox>
            <PisaTop15BarCountries />
          </GraphBox>
        </HomeContents>
      </Homepage>
      <Homepage>
        <HomeTitle>우리나라의 과목별 PISA 점수는?</HomeTitle>
        <HomeContents>
          <TextContent>
            <TextTitle>
              우리나라의 <TextEmphasize>과목별 점수</TextEmphasize>를
              비교해보면,
            </TextTitle>
            <TextParagraph>
              2006년부터 2018년까지 수학은 3.839% 떨어졌고, 과학은 0.575%
              떨어졌습니다.
            </TextParagraph>
            <TextParagraph>
              그에 비해
              <TextEmphasize> 읽기 점수 </TextEmphasize>는 위에서 봤듯이 7.554%
              하락했어요.
            </TextParagraph>
            <TextParagraph>
              같은 시험이지만 우리나라 학생들의{" "}
              <TextEmphasize> 문해력</TextEmphasize>이 수학보다 1.97배, 과학보다
              13.14배 더 감소하고 있네요.
            </TextParagraph>
          </TextContent>
          <GraphBox>
            <PisaSubjectScoreBar></PisaSubjectScoreBar>
          </GraphBox>
        </HomeContents>
      </Homepage>
      <Homepage>
        <HomeTitle>문해력은 우리 삶에 어떤 영향을 미칠까요?</HomeTitle>
        <HomeContents>
          <TextContent>
            <TextTitle>
              먼저, <TextEmphasize> GDP</TextEmphasize>와{" "}
              <TextEmphasize> PISA 점수</TextEmphasize>의 상관관계를 통해
              문해력의 중요성을 확인했어요.
            </TextTitle>
            <TextParagraph>
              77 개 나라의
              <TextEmphasize> PISA 점수</TextEmphasize>와
              <TextEmphasize> GDP</TextEmphasize> 의 회귀선을 그려봤어요.
            </TextParagraph>
            <TextParagraph>
              Pisa 점수가 <TextEmphasize>높은</TextEmphasize> 나라일 수록 GDP도{" "}
              <TextEmphasize>높은</TextEmphasize> 경향이 있다는 것을 확인할 수
              있어요.
            </TextParagraph>
            <TextParagraph>
              GDP가 높다고 무조건 잘 사는 나라이거나 행복한 나라는 아니지만,
              Pisa를 통해 어느정도 학생들의 미래
              <TextEmphasize> 경제활동 가능성</TextEmphasize>을 볼 수 있을 것
              같아요.
            </TextParagraph>
          </TextContent>
          <GraphBox>
            <PisaGdpScatter></PisaGdpScatter>
          </GraphBox>
        </HomeContents>
      </Homepage>
      <Homepage>
        <HomeTitle>고용률과 문해력의 상관관계</HomeTitle>
        <HomeContents>
          <TextContent>
            <TextTitle>
              그럼 Pisa점수는 <TextEmphasize>고용률</TextEmphasize>과는 어떤
              관계를 가지고 있을까요?
            </TextTitle>
            <TextParagraph>
              77 개 나라의 <TextEmphasize> PISA 점수</TextEmphasize>와{" "}
              <TextEmphasize>고용률</TextEmphasize>의 관계도 알아봤습니다.
            </TextParagraph>
            <TextParagraph>
              문해력이 높은 나라의 고용률이 높은 경향이 있었어요.
            </TextParagraph>
            <TextParagraph>
              PISA의 읽기 점수를 통해서 확인한 문해력은{" "}
              <TextEmphasize>GDP</TextEmphasize>와
              <TextEmphasize> 고용률</TextEmphasize> 모두와 양의 상관관계가
              있지만,{" "}
              <TextParagraph>문해력은 점점 감소하고 있습니다.</TextParagraph>
            </TextParagraph>
            <TextParagraph>
              우리 문해력을 높이기 위해 함께 노력해볼까요?
            </TextParagraph>
          </TextContent>
          <GraphBox>
            <PisaEmployee></PisaEmployee>
          </GraphBox>
        </HomeContents>
      </Homepage>
    </HomeContainer>
  );
}

export default Home;
