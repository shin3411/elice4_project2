import styled from "styled-components";

export const HomeContainer = styled.section`
  width: 100%;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &:nth-child(2) {
    background-color: black;
    justify-content: center;
  }
  @media only screen and (max-width: 1400px) {
    overflow-y: scroll;
  }
`;

export const FullBanner = styled.div`
  height: calc(100vh - 80px);
  overflow: hidden;
  background-color: #f5efea;
  box-sizing: border-box;
`;
export const Dot = styled.div`
  width: ${(props) => (props.scrollIndex === props.num ? "12px" : "5px")};
  height: ${(props) => (props.scrollIndex === props.num ? "12px" : "5px")};
  border-radius: 60%;
  background-color: ${(props) =>
    props.scrollIndex === props.num ? "#c48f5a" : "#c2a07f"};
  transition-duration: 1000;
  transition: background-color 0.5s;
`;

export const DotsBox = styled.div`
  position: fixed;
  top: 50%;
  right: 7vw;
  @media only screen and (max-width: 1500px) {
    display: none;
  }
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

export const Dots = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 80px;
`;

export const Homepage = styled.div`
  background-color: #f5efea;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;

  @media only screen and (max-width: 1300px) {
    width: 100%;
  }
`;

export const HomeTitle = styled.h1`
  font-size: 36px;
  margin: 1rem 2rem 1.4rem 2rem;
  @media only screen and (max-width: 1300px) {
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const HomeContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 1300px;
  @media only screen and (max-width: 1300px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
export const GraphBox = styled.div`
  width: 60%;
  // height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1300px) {
    width: 60%;
  }
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
`;

export const TextContent = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  width: 32%;
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  @media only screen and (max-width: 1300px) {
    width: 60%;
  }
  @media only screen and (max-width: 800px) {
    width: 80vw;
  }
`;

export const TextEmphasize = styled.span`
  color: #c48f5a;
`;

export const TextParagraph = styled.div`
  font-size: 1.2rem;
  line-height: 2rem;
  margin-bottom: 1.4rem;
  word-break: keep-all;
  font-weight: lighter;
`;

export const TextTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-bottom: 1.6rem;
  word-break: keep-all;
`;

export const Quote = styled.span`
  display: block;
  font-size: 13px;
  line-height: 1rem;
  color: grey;
`;

export const CountryButton = styled.button`
  width: 28px;
  height: 21px;
  margin: 1rem 0.5rem 0 0;
  box-shadow: 2px 2px 2px #503d3f;
  @media only screen and (max-width: 560px) {
    width: 24px;
    height: 18px;
  }
`;

export const FlagButton = styled.img`
  width: 28px;
  height: 21px;
  background-size: 28px 21px;
  transition-duration: 0.5s;
  &:hover {
    cursor: pointer;
  }
  &:active {
    margin-top: 1px;
    margin-left: 1px;
    box-shadow: none;
  }
  @media only screen and (max-width: 560px) {
    width: 24px;
    height: 18px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const IntroButton = styled.button`
  width: 10rem;
  height: 4rem;
  border-radius: 2rem;
  background-color: #c48f5a;
  color: white;
  font-size: 1.4rem;
  padding: 1rem;
  margin-top: 8rem;

  &:hover {
    cursor: pointer;
  }
`;

export const IntroWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
