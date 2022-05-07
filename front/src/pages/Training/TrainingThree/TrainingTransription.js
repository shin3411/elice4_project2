import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  PostingBody,
  PostingArea,
  PostingTitle,
  PostingButton,
} from "styles/Posts/PostingStyle";
import {
  TranscriptionContainer,
  TranscriptionContent,
} from "styles/Training/TrainingStyle";
import { Center } from "styles/Training/TrainingStyle";
import "styles/Posts/markdown.css";
import { post } from "utils/api";
export default function TrainingTransription({
  tags,
  category,
  subjectId,
  subject,
}) {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeMarkdown = (e) => {
    setMarkdown(e.target.value);
  };
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
  const onChangeTitle = (e) => {
    setTitle((cur) => e.target.value);
  };

  const submitTrainingPost = async (e) => {
    e.preventDefault();
    const curPost = {
      title: title,
      content: markdown,
      category,
      tags,
      subjectId,
    };
    await post("posts", curPost);
    navigate("/posts");
  };

  return (
    <form>
      <PostingBody>
        <PostingTitle
          isContentEmpty={!title.length}
          onChange={onChangeTitle}
          value={title}
          type="text"
          placeholder="제목을 입력해주세요.."
          required
        />
        <TranscriptionContent>
          <TranscriptionContainer>
            <ReactMarkdown
              className="markdown"
              remarkPlugins={[remarkGfm]}
              children={subject}
            ></ReactMarkdown>
            {/* <pre>{subject}</pre> */}
          </TranscriptionContainer>
          <PostingArea
            type="text"
            placeholder="내용을 입력해주세요..."
            onChange={handleChangeMarkdown}
            onKeyDown={handleSetTab}
            required
          />
        </TranscriptionContent>
        <Center>
          <PostingButton
            type="submit"
            disabled={markdown.length <= 0}
            onClick={(e) => submitTrainingPost(e)}
          >
            출간하기
          </PostingButton>
        </Center>
      </PostingBody>
    </form>
  );
}
