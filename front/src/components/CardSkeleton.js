import React from "react";
import {
  Skeletonontainer,
  SkeletonImg,
  SkeletonTag,
  SkeletonText,
} from "styles/Components/CardSkeletonStyle";

export default function CardSkeleton() {
  return (
    <Skeletonontainer>
      <SkeletonImg />
      <SkeletonText />
      <SkeletonTag />
      <SkeletonTag />
      <SkeletonText />
    </Skeletonontainer>
  );
}
