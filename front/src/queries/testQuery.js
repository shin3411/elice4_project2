import { useQuery, useQueryClient } from "react-query";
import { get } from "utils/api";

export function useTestQuery() {
  const queryClient = useQueryClient();
  const { isFetching, error, data } = useQuery(
    "tests",
    () => get("tests").then((res) => res.data),
    {
      staleTime: Infinity,
      onSuccess: () => console.log("test가 준비되었습니다."),
      onError: () => {
        console.log("테스트가 준비가 안됐습니다.");
        queryClient.setQueryData("tests", false);
      },
    }
  );
  return { tests: data, isFetching, error };
}
