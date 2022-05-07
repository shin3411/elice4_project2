import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`;

export const Skeletonontainer = styled.div`
  flex: 50%;
  padding: 10px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`;
export const SkeletonImg = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: #eaeaea;
  position: relative;
  animation: ${loading} 1.5s infinite linear;
`;

export const SkeletonTag = styled.span`
  display: inline-block;
  width: 30px;
  height: 20px;
  margin-right: 5px;
  background-color: #eaeaea;
  border-radius: 20px;
  position: relative;
  animation: ${loading} 1.5s infinite linear;
`;

export const SkeletonText = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  background-color: #eaeaea;
  border-radius: 20px;
  position: relative;
  animation: ${loading} 1.5s infinite linear;
`;
