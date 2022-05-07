import { useMutation, useQueryClient } from "react-query";
import { post } from "../utils/api";

export const useUserLevelUp = (userId, maxExp) => {
  const queryClient = useQueryClient();

  return useMutation(() => post(`level/${userId}`), {
    onMutate: () => {
      const profileUser = queryClient.getQueryData(["user", userId]);
      queryClient.setQueryData(["user", userId], {
        ...profileUser,
        level: profileUser.level + 1,
        point: profileUser.point - maxExp,
      });

      // onError에서 rollback으로 받을 함수
      return () => queryClient.setQueryData(["user", userId], profileUser);
    },
    onSuccess: () => queryClient.invalidateQueries(["user", userId]),
    onError: (err, rollback) => rollback(),
  });
};
