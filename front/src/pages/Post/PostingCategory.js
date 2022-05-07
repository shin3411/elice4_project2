import React, { forwardRef } from "react";
import { PostingCategoryBox, PostingMessage } from "styles/Posts/PostingStyle";
import "styles/Posts/markdown.css";
import { CATEGORY, LABEL } from "../../utils/constants";

const PostingCategory = forwardRef(({}, ref) => {
  const isCategoryEmpty = ref.current?.value.length === 0;

  return (
    <>
      <PostingCategoryBox
        ref={ref}
        isCategoryEmpty={isCategoryEmpty}
        type="option"
        placeholder="카테고리"
        // onChange={(e) => setIsCategoryEmpty(() => !e.target.value)}
      >
        <option value={LABEL.CATEGORY}>{LABEL.CATEGORY}</option>
        <option value={CATEGORY.NOVEL}>{CATEGORY.NOVEL}</option>
        <option value={CATEGORY.ESSAY}>{CATEGORY.ESSAY}</option>
        <option value={CATEGORY.POETRY}>{CATEGORY.POETRY}</option>
        <option value={CATEGORY.ETC}>{CATEGORY.ETC}</option>
      </PostingCategoryBox>
      {isCategoryEmpty && (
        <PostingMessage>카테고리를 선택해주세요.</PostingMessage>
      )}
    </>
  );
});
export default PostingCategory;
