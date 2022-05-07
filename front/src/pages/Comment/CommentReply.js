import React, { useState } from "react";
import CommentSingle from "./CommentSingle";
import { ReCommentBox, ReplyCommentBtn } from "styles/Comment/CommentStyle";
export default function CommentRePly({ childComments }) {
  const [isOpenReply, setIsOpenReply] = useState(false);

  const onClickOpenReplyList = () => {
    setIsOpenReply((cur) => !cur);
  };

  // 댓글의 아이디가 parentId인 것을 렌더링
  return (
    <ReCommentBox>
      <ReplyCommentBtn onClick={onClickOpenReplyList}>
        {isOpenReply ? "▲" : "▼"} 답글{" "}
        {childComments.filter((comment) => !comment.isDeleted).length}개 보기
      </ReplyCommentBtn>
      {isOpenReply &&
        childComments?.map((comment, index) => (
          // key를 어떻게 할지...
          <React.Fragment key={comment._id}>
            {!comment.isDeleted && (
              <CommentSingle comment={comment} isReComment={true} />
            )}
          </React.Fragment>
        ))}
    </ReCommentBox>
  );
}
