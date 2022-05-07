import styled, { keyframes } from "styled-components";
import { img } from "utils/imgImport";

const inputAnimation = keyframes`
 0%{
  width: 0;
 }
 100% {
    width: 100%;
 }
  
`;

export const CommentContainer = styled.section`
  padding: 0 20px;
  margin: 0 auto;
`;

export const CommentWrap = styled.div`
  max-width: 768px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const CommentTitle = styled.h2`
  margin-bottom: 0.75rem;
`;

export const WriteComment = styled.form`
  width: 100%;
`;
export const InputBox = styled.div`
  width: 100%;
`;

export const WriteCommentWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const InputComment = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.2rem;
  margin: 7px 0 8px 7px;
  padding: 3px;
  box-sizing: border-box;
  background: transparent;
  resize: none;
  transition: all 0.5s;
  &:focus {
    animation: ${inputAnimation} 0.5s ease-in-out;
  }
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CommentBtn = styled.button`
  padding: 4px 10px;
  background-color: transparent;
  border: 1px solid #312517;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #ffffff;
    background-color: #c48f5a;
    border: 1px solid #c48f5a;
  }
`;

export const UserCommentList = styled.div``;

export const UserComment = styled.div``;

// CommentSingle

export const ReCommentBox = styled.div`
  margin-left: 56px;
`;

export const CommentBox = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 5px;
`;

export const UserThumbnail = styled.div`
  // 고정요소로 등록
  flex: none;
  margin-right: 14px;
`;

export const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  margin-bottom: 5px;
  cursor: pointer;
`;

export const Comment = styled.p`
  margin-bottom: 10px;
`;

export const CommentEditContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const ReplyCommentBtn = styled.button`
  width: auto;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  color: #c4c4c4;
  transition: all 0.1s ease-in-out;
  margin-right: 5px;
  &:hover {
    color: black;
  }
`;

export const CommentEditBtn = styled(ReplyCommentBtn)``;
