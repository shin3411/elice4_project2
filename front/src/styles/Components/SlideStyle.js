import styled from "styled-components";

export const SlideWrap = styled.section`
  position: relative;
  height: 100%;
`;

export const OverFlow = styled.div`
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  width: ${(props) => props.w};
  transform: ${(props) => props.transform};
  transition: ${(props) => props.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
export const SlideInner = styled.div`
  width: 100vw;
`;
export const SlideItem = styled.div`
  width: 100%;
`;

export const Btn = styled.button`
  border: none;
  background: none;
  color: #c48f5a;
  font-size: 20px;
  position: absolute;
  top: 50%;
  @media screen and (max-width: 564px) {
    display: none;
  }
`;

export const PrevBtn = styled(Btn)`
  left: 15%;
`;
export const NextBtn = styled(Btn)`
  right: 15%;
`;
