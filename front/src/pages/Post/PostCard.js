import React from "react";
import { Link } from "react-router-dom";
import {
  Posts,
  PostImgContainer,
  PostsImage,
  PostsSummary,
  PostsContentWrap,
  PostsContent,
  PostsTitle,
  PostsWriter,
  Tag,
  PostsLike,
  LikeButton,
  PostUserContainer,
  PostListcounnt,
  PostsCategory,
} from "styles/Posts/PostStyle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { usePostLikeAdd, usePostDislike } from "queries/postQuery";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostCard({ userInfo, isDisabled, post }) {
  const postAddLike = usePostLikeAdd(post._id, userInfo._id);
  const postDislike = usePostDislike(post._id, userInfo._id);
  const isPostLike = userInfo.postLikes.includes(post._id);

  const handlePostLikeOnClick = () => postAddLike.mutate();
  const handlePostDisLikeOnClick = () => postDislike.mutate();

  const postLikeList = isPostLike ? (
    <LikeButton disabled={!isDisabled} onClick={handlePostDisLikeOnClick}>
      <FavoriteIcon />
    </LikeButton>
  ) : (
    <LikeButton disabled={!isDisabled} onClick={handlePostLikeOnClick}>
      <FavoriteBorderIcon color="disabled" />
    </LikeButton>
  );

  return (
    <Posts>
      <PostImgContainer>
        <Link to={`/posts/${post._id}`}>
          <PostsImage alt="게시글 사진" src={post.imageUrl} />
        </Link>
      </PostImgContainer>
      <PostsSummary>
        <Link to={`/posts/${post._id}`}>
          <PostsTitle>{post.title}</PostsTitle>
        </Link>
        <Link to={`/posts?category=${post.category}`}>
          <PostsCategory>{post.category}</PostsCategory>
        </Link>
        <PostsContentWrap>
          <PostsContent>
            <ReactMarkdown
              children={post.content.slice(0, 80)}
              remarkPlugins={[remarkGfm]}
            ></ReactMarkdown>
          </PostsContent>
        </PostsContentWrap>
        <PostsContentWrap>
          {post.tags?.map((tag, index) => (
            <Link to={`/posts?tag=${tag}`} key={index}>
              <Tag>#{tag}</Tag>
            </Link>
          ))}
        </PostsContentWrap>
        <PostUserContainer>
          <PostsWriter>
            <Link to={`/user/${post.userId}`}>
              by. {!post.author ? "익명 문하생" : post.author}
            </Link>
          </PostsWriter>
          <PostsLike>
            {postLikeList}
            <PostListcounnt>{post.likeCount}</PostListcounnt>
          </PostsLike>
        </PostUserContainer>
      </PostsSummary>
    </Posts>
  );
}

export default PostCard;
