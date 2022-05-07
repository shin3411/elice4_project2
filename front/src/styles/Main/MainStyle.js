import styled from "styled-components";
import { FlexBox, FlexBoxCenter, HeadingTwo } from "../Components/CommonStyle";

export const MainContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1024px;
  padding: 0 20px;
  margin: 0 auto;
`;

export const MainHeadingTwo = styled(HeadingTwo)`
  font-size: 2rem;
  margin: 20px 0;
`;

export const RankingContainer = styled(FlexBox)`
  border-radius: 8px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #dcd0c8;
  padding: 10px;
  margin-bottom: 30px;
`;

export const RankingBox = styled(FlexBoxCenter)`
  margin: 10px;
`;

export const RankImg = styled.img`
  margin-right: 10px;
`;

export const RankNickName = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
`;

export const RankPoint = styled.span`
  margin-left: 9px;
`;

export const PopularityPostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  padding: 0 20px;
`;
