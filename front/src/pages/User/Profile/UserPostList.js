import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { MyPostContainer, NotFoundPostImg } from "styles/User/ProfileStyle";
import { PostsContainer } from "styles/Posts/PostStyle";
import { useGetPostList } from "queries/postQuery";
import { img } from "utils/imgImport";
import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";
import PostCard from "pages/Post/PostCard";
import { useQueryClient } from "react-query";

function UserPostList() {
  const params = useParams();
  const location = useLocation();
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");

  // 유저의 글목록 또는 좋아요 글목록 fetch
  const queryString = location.search.substring(1);
  const fetchURI =
    queryString === "likes"
      ? `users/${params.userId}/likes?`
      : `users/${params.userId}/posts?`;
  const { data, status, fetchNextPage, isFetchingNextPage } =
    useGetPostList(fetchURI);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorPage />;

  const isHavePost = data.pages[0].posts.length !== 0;
  const userPosts = isHavePost ? (
    <PostsContainer>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.posts.map((post) => (
            <PostCard
              key={post._id}
              userInfo={userState}
              isDisabled={isLogin}
              post={post}
            />
          ))}
        </React.Fragment>
      ))}
    </PostsContainer>
  ) : (
    <NotFoundPostImg src={img.notPost} alt="notPost" />
  );

  return (
    <>
      <MyPostContainer>{userPosts}</MyPostContainer>
      {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    </>
  );
}

export default UserPostList;
