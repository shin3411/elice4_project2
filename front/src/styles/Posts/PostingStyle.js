import styled, { css } from "styled-components";

export const PostingBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 3rem 0;
`;

// Title
export const PostingTitleBox = styled.div`
  display: flex;
  align-items: center;
`;
export const PostingTitle = styled.input`
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  border: none;
  background-color: transparent;
  ${(props) => (props.isTitleEmpty ? focusInput : "outline : none")};
  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;

const focusInput = css`
  outline: 3px solid #c48f5a;
  transition: 0.2s ease-in-out;
`;

export const PostingCategoryBox = styled.select`
  width: 6.2rem;
  padding: 10px 3px;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${(props) => (props.isCategoryEmpty === "" ? focusInput : "outline : none")};
`;

export const PostingTags = styled.input`
  min-width: 8rem;
  line-height: 2rem;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  border: none;
  display: inline-flex;
  background-color: transparent;
  outline: none;
  cursor: text;
`;

export const PostingContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: auto;
  white-space: pre-wrap;
`;

export const PostingArea = styled.textarea`
  width: 100%;
  min-height: 50vh;
  padding: 10px;
  border-radius: 5px;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: 1px;
  border: none;
  resize: none;
  ${(props) => (props.isContentEmpty ? focusInput : "outline : none")};
`;

export const PostingButton = styled.button`
  display: ${(props) => props.display};
  background-color: #445656;
  width: 90px;
  height: 40px;
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 16px;
  color: #f9f9f9;
  border: none;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
    transition: 0.1s ease-in-out;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const PostingMessage = styled.span`
  font-size: 14px;
  color: #d1985f;
  margin-left: 10px;
  @media only screen and (max-width: 400px) {
    display: none;
  }
`;
