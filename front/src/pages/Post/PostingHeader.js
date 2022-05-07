import React, { forwardRef } from "react";
import {
  PostingTitle,
  PostingTitleBox,
  PostingMessage,
} from "styles/Posts/PostingStyle";
import "styles/Posts/markdown.css";

const PostingHeader = forwardRef(({}, ref) => {
  const isTitleEmpty = ref.current?.value.length === 0;
  return (
    <PostingTitleBox>
      <PostingTitle
        // onChange={(e) => setIsTitleEmpty(() => !e.target.value)}
        isTitleEmpty={isTitleEmpty}
        type="text"
        placeholder="제목을 입력하세요"
        ref={ref}
      />
      {isTitleEmpty && <PostingMessage>제목을 입력해주세요.</PostingMessage>}
    </PostingTitleBox>
  );
});
export default PostingHeader;
