import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostingHeader from "./PostingHeader";
import PostingContents from "./PostingContents";
import PostingTag from "./PostingTag";
import PostingCategory from "./PostingCategory";
import { PostingButton, PostingBody } from "styles/Posts/PostingStyle";
import "styles/Posts/markdown.css";
import { post, uploadFile } from "utils/api";
import FileUpload from "../../components/FileUpload";
import { useQueryClient } from "react-query";
import { PostChangeImgBox, PreviewImg } from "../../styles/Posts/PostStyle";

function Posting() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState } = queryClient.getQueryData("userState");
  const [editPostImg, setEditPostImg] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://team2.cdn.ntruss.com/posts/default.png"
  );

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tagRef = useRef(null);
  const categoryRef = useRef(null);
  const inputEmpty = useRef(true);
  const [renderer, setRenderer] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();
    setRenderer(!renderer);

    inputEmpty.current =
      contentRef.current?.value.length === 0 ||
      titleRef.current?.value.length === 0 ||
      categoryRef.current?.value.length === 0;

    if (!inputEmpty.current) {
      await handleSubmit();
    } else {
      const errorMessage = "빈값을 입력해주세요.";
      throw new Error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const posting = {
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        tags: tagRef.current.innerText.slice(1).split("\n#"),
        subjectId: null,
        category: categoryRef.current?.value,
      };

      const res = await post("posts", posting);
      const postId = res.data.newPost[0]._id;
      await uploadFile(`posts/${postId}/uploadImage`, editPostImg);
      navigate(`/posts/${postId}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  // 썸네일 이미지 업로드
  const thumbnailImageData = {
    prevImage: userState.profileUrl,
    setEditImg: setEditPostImg,
    setImgUrl,
  };

  return (
    <PostingBody>
      <PreviewImg imgUrl={imgUrl}></PreviewImg>
      <PostingHeader ref={titleRef} />
      <PostingCategory ref={categoryRef} />
      <PostingTag ref={tagRef} />
      <PostChangeImgBox>
        <FileUpload {...thumbnailImageData} />
      </PostChangeImgBox>
      <PostingContents ref={contentRef} />
      <div className="postingButton">
        <PostingButton type="submit" onClick={handleClick}>
          출간하기
        </PostingButton>
      </div>
    </PostingBody>
  );
}
export default Posting;
