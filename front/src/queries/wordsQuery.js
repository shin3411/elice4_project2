import { useQuery } from "react-query";
import { get } from "utils/api";

export function useWordsQuery() {
  const { isFetching, error, data } = useQuery(
    "words",
    async () => await get(`quizzes`).then((res) => res.data),
    {
      staleTime: Infinity,
      onSuccess: () => console.log("단어가 준비되었습니다."),
      onError: () => {
        console.log("테스트가 준비가 안됐습니다.");
      },
    }
  );
  return { words: data, isFetching, error };
}
