import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { get, patch } from "utils/api";

export function useGetPostList(endpoint = "") {
  const fetchPostList = async ({ pageParam = 1 }) => {
    const res = await get(`${endpoint}page=${pageParam}&limit=6`);
    const { posts, isLast } = res.data;
    return { posts, nextPage: pageParam + 1, isLast };
  };

  return useInfiniteQuery(["posts", endpoint], fetchPostList, {
    staleTime: 5000,
    cacheTime: 1500,
    getNextPageParam: (lastPage) =>
      !lastPage.isLast ? lastPage.nextPage : undefined,
  });
}

export function useGetPost(id) {
  const fetchPost = async () => {
    const res = await get(`posts/${id}`);
    return res.data;
  };

  return useQuery(["post", id], fetchPost, {
    staleTime: 5000,
    cacheTime: 1500,
    onError: (err) => console.log(err),
  });
}

export function useGetPostLikeCount(id) {
  const fetchPost = async () => {
    const res = await get(`posts/${id}/likes`);
    return res.data.length;
  };

  return useQuery(["likeCnt", id], fetchPost, {
    staleTime: 5000,
    cacheTime: 1500,
    onError: (err) => console.log(err),
  });
}

export const usePostLikeAdd = (postId, userId) => {
  const queryClient = useQueryClient();

  return useMutation(() => patch(`users/${userId}/like`, { postId }), {
    onMutate: () => {
      const profileUser = queryClient.getQueryData(["user", userId]);
      const currentUser = queryClient.getQueryData(["userState"]);
      const { userState, isLogin } = currentUser;

      queryClient.setQueryData(["userState"], () => ({
        isLogin,
        userState: {
          ...userState,
          postLikes: [...userState.postLikes, postId],
        },
      }));

      queryClient.setQueryData(["user", userId], {
        ...profileUser,
        postLikes: [...profileUser.postLikes, postId],
      });

      // onError에서 rollback으로 받을 함수
      return () => {
        queryClient.setQueryData(["userState"], currentUser);
        queryClient.setQueryData(["user", userId], profileUser);
      };
    },
    onSuccess: () => queryClient.invalidateQueries("posts"),
    onError: (err, rollback) => rollback(),
  });
};

export const usePostDislike = (postId, userId) => {
  const queryClient = useQueryClient();

  return useMutation(() => patch(`users/${userId}/cancelLike`, { postId }), {
    onMutate: () => {
      const profileUser = queryClient.getQueryData(["user", userId]);
      const currentUser = queryClient.getQueryData(["userState"]);
      const { userState, isLogin } = currentUser;
      const newPostLikeList = userState.postLikes.filter(
        (likeId) => likeId !== postId
      );

      queryClient.setQueryData(["userState"], () => ({
        isLogin,
        userState: { ...userState, postLikes: newPostLikeList },
      }));

      queryClient.setQueryData(["user", userId], () => ({
        ...profileUser,
        postLikes: newPostLikeList,
      }));

      // onError에서 rollback으로 받을 함수
      return () => {
        queryClient.setQueryData(["userState"], currentUser);
        queryClient.setQueryData(["user", userId], profileUser);
      };
    },
    onSuccess: () => queryClient.invalidateQueries("posts"),
    onError: (err, rollback) => rollback(),
  });
};

export const usePostLikeCount = (postId) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (type) => {
      const res = await get(`posts/${postId}/likes`);
      return { data: res.data.length, type };
    },
    {
      onMutate: (type) => {
        const staleLikeCount = queryClient.getQueryData(["likeCnt", postId]);
        queryClient.setQueryData(["likeCnt", postId], () => {
          if (type === "up") return staleLikeCount + 1;
          return staleLikeCount - 1;
        });

        // onError에서 rollback으로 받을 함수
        return () =>
          queryClient.setQueryData(["likeCnt", postId], staleLikeCount);
      },
      onError: (err, rollback) => rollback(),
    }
  );
};
