import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentInput from "pages/Comment/CommentInput";
import CommentEditForm from "pages/Comment/CommentEditForm";
import { useQueryClient } from "react-query";
import { useDeleteComment } from "queries/commentQuery";
import {
  CommentBox,
  UserThumbnail,
  Profile,
  CommentContent,
  UserName,
  Comment,
  ReplyCommentBtn,
  CommentEditContainer,
  CommentEditBtn,
} from "styles/Comment/CommentStyle";

export default function CommentSingle({ comment, isReComment = false }) {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const { userState, isLogin } = queryClient.getQueryData("userState");
  const deleteComment = useDeleteComment();
  const navigate = useNavigate();

  const onClickOpenReplyInput = () => {
    setIsOpenReply((cur) => !cur);
  };
  const deleteSubmitComment = () => {
    deleteComment.mutate(comment._id);
  };
  return (
    <CommentBox>
      <UserThumbnail>
        <Profile
          onClick={() => navigate(`/user/${comment.userId}`)}
          src={comment.user.profileUrl}
          alt="user thumbnail"
        />
      </UserThumbnail>
      <CommentContent>
        {!isEdit ? (
          <>
            <UserName onClick={() => navigate(`/user/${comment.userId}`)}>
              {comment.author}
            </UserName>
            <Comment>{comment.content}</Comment>
          </>
        ) : (
          <CommentEditForm
            prev={comment.content}
            commentId={comment._id}
            postId={comment.postId}
            setIsEdit={setIsEdit}
          />
        )}

        <CommentEditContainer>
          {!isReComment && isLogin && (
            <ReplyCommentBtn onClick={onClickOpenReplyInput}>
              {isOpenReply ? "취소" : "답글"}
            </ReplyCommentBtn>
          )}
          {userState._id === comment.userId && (
            <>
              <CommentEditBtn onClick={() => setIsEdit((cur) => !cur)}>
                {isEdit ? "취소" : "수정"}
              </CommentEditBtn>
              <CommentEditBtn onClick={deleteSubmitComment}>
                삭제
              </CommentEditBtn>
            </>
          )}
        </CommentEditContainer>
        {isOpenReply && !isReComment && (
          <CommentInput
            isOpenReply={isOpenReply}
            setIsOpenReply={setIsOpenReply}
            parentId={comment._id}
          />
        )}
      </CommentContent>
    </CommentBox>
  );
}
