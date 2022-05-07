import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post, put } from "utils/api";
import { useNavigate } from "react-router-dom";

/**
 * 현재 유저상태를 받아오며, token이 없다면 userState는 false를 기본값으로 가집니다.
 * @returns {UseQueryResult<{isLogin:boolean, userState: object}, unknown>}
 */
export function useGetCurrentUser() {
  const queryclient = useQueryClient();

  return useQuery(
    "userState",
    async () => {
      const res = await get("users/current");
      return { userState: res.data, isLogin: !!res.data };
    },
    {
      staleTime: Infinity,
      onError: () =>
        queryclient.setQueryData("userState", {
          isLogin: false,
          userState: { _id: "visitor", postLikes: [] },
        }),
    }
  );
}

/**
 * 유저의 프로필을 받아옵니다.
 * @param id
 * @returns {UseQueryResult<{userProfile: object}, unknown>}
 */
export function useGetProfileUser(id) {
  const queryClient = useQueryClient();
  return useQuery(
    ["user", id],
    async () => {
      const res = await get(`users/${id}`);
      return res.data;
    },
    {
      staleTime: 5000,
      cacheTime: 1500,
      onError: () =>
        queryClient.setQueryData(["user", id], { role: "visitor" }),
    }
  );
}

export function useGetProfileOwner(id) {
  const queryClient = useQueryClient();
  return useQuery(
    ["user", id],
    async () => {
      const res = await get(`users/${id}`);
      return res.data;
    },
    {
      staleTime: Infinity,
      onError: () =>
        queryClient.setQueryData(["user", id], { role: "visitor" }),
    }
  );
}

export function useGetUserRank() {
  const queryClient = useQueryClient();
  return useQuery(
    "expRank",
    async () => {
      const res = await get(
        `users?sort[field]=point&sort[type]=desc&page=1&limit=3`
      );
      return res.data;
    },
    {
      staleTime: 5000,
      cacheTime: 1500,
      onError: () => queryClient.setQueryData("expRank", []),
    }
  );
}

/**
 * 유저 로그인 핸들러입니다.
 * @param {function} setShowAlert 요청 실패 시 alert를 활성화 해줄 상태변경 함수입니다.
 * @returns {function} useMutation 훅을 반환합니다.
 */
export const useUserLoginHandler = (setShowAlert = () => {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async (loginData) => await post("users/login", loginData),
    {
      onSuccess: (res) => {
        const jwtToken = res.data.token;
        localStorage.setItem("userToken", jwtToken);
        queryClient.invalidateQueries("userState");
        navigate("/");
      },
      onError: () => setShowAlert(true),
    }
  );
};

/**
 * 유저의 프로필 수정 핸들러입니다.
 * @param {string} id 프로필을 변경 할 유저의 id 입니다.
 * @param {function} setShowAlert 요청 실패 시 alert를 활성화 해줄 상태변경 함수입니다.
 * @returns {function} useMutation 훅을 반환합니다.
 */
export const useChangeProfileHandler = (id, setShowAlert = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (changeProfileData) => await put(`users/${id}`, changeProfileData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userState");
        queryClient.invalidateQueries(["user", id]);
      },
      onError: () => setShowAlert(true),
    }
  );
};
