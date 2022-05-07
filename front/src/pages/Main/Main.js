import React from "react";
import { MainContainer, MainHeadingTwo } from "../../styles/Main/MainStyle";
import { LABEL } from "../../utils/constants";
import Ranking from "./Ranking";
import Training from "../Training/Training";
import PopularityPost from "./PopularityPost";
import { useGetProfileOwner } from "../../queries/userQuery";
import { useQueryClient } from "react-query";
import Loading from "../../components/Loading";

export default function Main() {
  const queryClient = useQueryClient();
  const { userState } = queryClient.getQueryData("userState");
  const { isFetching } = useGetProfileOwner(userState._id);

  if (isFetching) return <Loading />;

  return (
    <MainContainer>
      <MainHeadingTwo>{LABEL.RANKING}</MainHeadingTwo>
      <Ranking />
      <MainHeadingTwo>{LABEL.TRAINING}</MainHeadingTwo>
      <Training />
      <MainHeadingTwo>{LABEL.POPULARITY}</MainHeadingTwo>
      <PopularityPost />
    </MainContainer>
  );
}
