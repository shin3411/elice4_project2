import styled from "styled-components";

export const PostsContainer = styled.div`
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 16px;
  justify-content: center;
  padding: initial;
  margin: 50px auto;
  padding: 0 20px;
  @media screen and (min-width: 512px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 0 5px #c48f5a;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const PostImgContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const PostsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
export const PostsSummary = styled.div`
  width: 100%;
  flex: 1 1 0%;
  box-sizing: border-box;
  padding: 10px;
`;
export const PostsHeader = styled.div``;
export const PostsTitle = styled.h2`
  display: inline-block;
  font-size: 1.4rem;
  margin: 15px 0;
`;
export const PostsCategory = styled.p`
  display: inline-block;
  color: gray;
  margin-left: 5px;
`;
export const PostsWriter = styled.h4`
  font-size: 1rem;
  font-weight: lighter;
`;

export const PostsContentWrap = styled.div`
  flex: 1 1 0%;
`;
export const PostsContent = styled.span`
  font-size: 1.1rem;
  line-height: 1.5;
  height: 5rem;
  margin-bottom: 1rem;
  font-weight: lighter;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Tag = styled.span`
  font-weight: lighter;
  display: inline-block;
  font-size: 1rem;
  margin: 0 7px 0 0;
`;
export const PostsLike = styled.div`
  display: flex;
  align-items: center;
`;
export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 50px auto 0;
  padding: 0 20px;
  max-width: 768px;
`;

export const PostUserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const PostTitle = styled.div`
  font-size: 2.25rem;
  margin-bottom: 2rem;
`;

export const PostEditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  margin-bottom: 1.5rem;
`;

export const PostEditBtn = styled.button`
  font-size: 1.2rem;
  border: none;
  background: transparent;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const PostHeaderWrap = styled.div``;

export const PostFooter = styled.div``;

export const PostWriter = styled.div`
  display: flex;
  align-items: center;
  font-family: lighter;
  font-size: 1.5rem;
  gap: 7px;
  margin-bottom: 0.75rem;
`;

export const PostDate = styled.p`
  font-size: 1.2rem;
`;

export const PostBody = styled.div`
  width: 100%;
  margin: 5rem auto;
  box-sizing: border-box;
`;

export const PostBodyWrap = styled.div`
  width: 100%;
  font-size: 1.4rem;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
`;

export const PostImageBox = styled.div`
  display: flex;
`;

export const PostImage = styled.img`
  max-width: 30%;
  max-height: 20vh;
  margin: 0 20px;
`;

export const PostContent = styled.div``;

export const PostListcounnt = styled.p`
  margin-left: 3px;
  font-size: 1.2rem;
  font-weight: lighter;
`;

export const PostLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #adb5bd;
  padding: 2px 12px 1px;
  border-radius: 20px;
`;

export const PostLikeCount = styled.span`
  font-size: 1rem;
  line-height: 1.2;
`;

export const LikeButton = styled.button`
  border: none;
  background-color: transparent;
  text-align: center;
  color: #c48f5a;
  line-height: 0.8;
  &:hover {
    text-decoration: none;
  }

  &:disabled {
    color: #adb5bd;
  }
`;

export const PreviewImg = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.imgUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto 20px auto;
`;

export const PostChangeImgBox = styled.div`
  width: 20%;
  margin-bottom: 10px;
`;
