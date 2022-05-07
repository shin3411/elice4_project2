import React, { useState, forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  PostingContent,
  PostingArea,
  PostingMessage,
} from "styles/Posts/PostingStyle";
import "styles/Posts/markdown.css";

const PostingContents = forwardRef(({}, ref) => {
  const [markdown, setMarkdown] = useState("");
  const handleChangeMarkdown = (e) => {
    e.preventDefault();
    setMarkdown(e.target.value);
    ref.current.style.height = "inherit";
    ref.current.style.height = ref.current?.scrollHeight + "px";
  };
  const isContentEmpty = ref.current?.value.length === 0;

  const handleSetTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value =
        e.target.value.substring(0, start) +
        "    " +
        e.target.value.substring(end);
      handleChangeMarkdown(e);
    }
  };

  return (
    <>
      <PostingContent>
        <PostingArea
          placeholder="내용을 입력해주세요"
          ref={ref}
          onChange={handleChangeMarkdown}
          isContentEmpty={isContentEmpty}
          onKeyDown={handleSetTab}
        ></PostingArea>
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm]}
          className="markdown"
        ></ReactMarkdown>
      </PostingContent>
      {isContentEmpty && <PostingMessage>내용을 입력해주세요.</PostingMessage>}
    </>
  );
});
export default PostingContents;
