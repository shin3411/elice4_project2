import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetCommentList } from "queries/commentQuery";
import { useQueryClient } from "react-query";
import CommentInput from "pages/Comment/CommentInput";
import CommentSingle from "pages/Comment/CommentSingle";
import CommentReply from "pages/Comment/CommentReply";
import {
  CommentContainer,
  CommentWrap,
  UserCommentList,
  CommentTitle,
} from "styles/Comment/CommentStyle";
import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";
export default function Comment({ postId }) {
  const { data, status, fetchNextPage, isFetchingNextPage } =
    useGetCommentList(postId);
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const { isLogin } = queryClient.getQueryData("userState");
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorPage />;

  return (
    <CommentContainer>
      <CommentWrap>
        <CommentTitle>댓글</CommentTitle>
        {isLogin && <CommentInput />}

        <UserCommentList>
          <>
            {data?.pages?.map((page, i) => (
              <React.Fragment key={i}>
                {page.comments?.map((comment, k) => (
                  <React.Fragment key={comment._id}>
                    {!comment.isDeleted && (
                      <>
                        <CommentSingle comment={comment} />
                        {comment.childComments.length > 0 && (
                          <CommentReply childComments={comment.childComments} />
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        </UserCommentList>
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </CommentWrap>
    </CommentContainer>
  );
}
