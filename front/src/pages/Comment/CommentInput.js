import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { usePostComment } from "queries/commentQuery";
import {
  WriteComment,
  WriteCommentWrap,
  InputComment,
  ButtonWrap,
  CommentBtn,
  Profile,
} from "styles/Comment/CommentStyle";
export default function CommentInput({
  setIsOpenReply,
  isOpenReply,
  parentId = null,
}) {
  const inputRef = useRef();
  const params = useParams();
  const queryClient = useQueryClient();
  const postComment = usePostComment();
  const [curComment, setCurComment] = useState("");
  const { userState } = queryClient.getQueryData("userState");

  useEffect(() => {
    isOpenReply && inputRef.current.focus();
  }, []);

  const onChangeWriteComment = (e) => {
    setCurComment((cur) => e.target.value);
  };
  const onSubmiComment = (e) => {
    e.preventDefault();
    const comment = {
      postId: params.postId,
      content: curComment,
      author: userState.nickname,
      userId: userState._id,
      parentId: parentId,
    };
    postComment.mutate(comment);
    setCurComment("");
    setIsOpenReply(false);
  };

  return (
    <WriteComment onSubmit={onSubmiComment}>
      <WriteCommentWrap>
        <Profile src={userState.profileUrl} alt="user thumbnail" />
        <InputComment
          type="text"
          value={curComment}
          onChange={onChangeWriteComment}
          ref={inputRef}
          required
        />
      </WriteCommentWrap>
      <ButtonWrap>
        <CommentBtn type="submit" onSubmit={onSubmiComment}>
          댓글 작성
        </CommentBtn>
      </ButtonWrap>
    </WriteComment>
  );
}
