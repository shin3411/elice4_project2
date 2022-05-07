import { useInfiniteQuery, useQueryClient, useMutation } from "react-query";
import { get, post, put, del } from "utils/api";

export const useGetCommentList = (postId) => {
  const fetchCommentList = async ({ pageParam = 1 }) => {
    const res = await get(`posts/${postId}/comments?page=${pageParam}&limit=6`);
    const { comments, isLast } = res.data;
    return { comments, nextPage: pageParam + 1, isLast };
  };

  return useInfiniteQuery(["comments", postId], fetchCommentList, {
    staleTime: 50000,
    cacheTime: 120000,
    getNextPageParam: (lastPage) =>
      !lastPage.isLast ? lastPage.nextPage : undefined,
  });
};

export const usePostComment = (postId) => {
  const queryClient = useQueryClient();
  //comment에 parentId가 있으면 대댓글, 없으면 일반 부모 댓글
  // parentId 있으면 setQueryData 해줘야됨. 바로 보이게
  return useMutation(
    async (comment) => {
      await post(`posts/${comment.postId}/comments`, comment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },

      onError: (err) => console.log(err),
    }
  );
};

export const useUpdateComment = (postId) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (comment) =>
      await put(`comments/${comment.commentId}`, {
        content: comment.curComment,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("comments"),
      onError: () => console.log("이게 모얌"),
    }
  );
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation((commentId) => del(`comments/`, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
    onError: () => console.log("이게 모얌"),
  });
};
