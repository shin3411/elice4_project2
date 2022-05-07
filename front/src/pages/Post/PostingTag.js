import React, { useState, forwardRef } from "react";
import { PostingTags } from "styles/Posts/PostingStyle";
import "styles/Posts/markdown.css";

const PostingTag = forwardRef(({ editTagArray = [] }, ref) => {
  const [tag, setTag] = useState("");
  const [tagArray, setTagArray] = useState(editTagArray);

  const onChangeTag = (e) => {
    e.preventDefault();
    setTag(() => e.target.value);
  };

  const handleTagClick = (e) => {
    const tagToDelete = e.target?.innerHTML.slice(1);
    setTagArray(tagArray.filter((v) => v !== tagToDelete));
  };

  const handleTagEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      setTagArray((prev) => [...prev, tag]);
      setTag("");
    }
  };

  return (
    <div className="hashWrap">
      <div className="tagsWrapper" ref={ref}>
        {tagArray.map((tag, index) => {
          return (
            <div key={index} className="tagBox" onClick={handleTagClick}>
              #{tag}
            </div>
          );
        })}
      </div>

      <PostingTags
        className="tagsInput"
        type={"text"}
        placeholder={"태그를 입력하세요"}
        value={tag}
        onChange={onChangeTag}
        onKeyUp={handleTagEnter}
      />
    </div>
  );
});
export default PostingTag;
