import React, { useState, useEffect, useRef } from "react";
import { useUpdateComment } from "queries/commentQuery";
import {
  WriteComment,
  WriteCommentWrap,
  InputComment,
  ButtonWrap,
  CommentBtn,
} from "styles/Comment/CommentStyle";

export default function CommentEditForm({
  prev,
  commentId,
  postId,
  setIsEdit,
}) {
  const [curComment, setCurComment] = useState(prev);
  const updateComment = useUpdateComment(postId);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus({ cursor: "end" });
  }, []);

  const onSubmitComment = (e) => {
    e.preventDefault();
    try {
      updateComment.mutate({ commentId, curComment });
      setIsEdit(false);
    } catch (e) {
      console.log("에러처리를 어떻게 하지");
    }
  };
  return (
    <WriteComment onSubmit={onSubmitComment}>
      <WriteCommentWrap>
        <InputComment
          row="1"
          value={curComment}
          onChange={(e) => setCurComment((cur) => e.target.value)}
          ref={inputRef}
          required
        />
      </WriteCommentWrap>
      <ButtonWrap>
        <CommentBtn type="submit" onSubmit={onSubmitComment}>
          저장
        </CommentBtn>
      </ButtonWrap>
    </WriteComment>
  );
}
