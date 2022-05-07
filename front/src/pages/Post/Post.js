import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useQueryClient } from "react-query";
import { useGetProfileUser } from "queries/userQuery";
import PostEditForm from "./PostEditForm";
import Loading from "components/Loading";
import FileUpload from "components/FileUpload";
import Comment from "pages/Comment/Comment";
import {
  useGetPost,
  useGetPostLikeCount,
  usePostDislike,
  usePostLikeAdd,
  usePostLikeCount,
} from "queries/postQuery";
import {
  PostContainer,
  PostHeader,
  PostHeaderWrap,
  PostTitle,
  PostWriter,
  PostDate,
  PostBody,
  PostBodyWrap,
  PostImageBox,
  PostImage,
  PostFooter,
  Tag,
  LikeButton,
  PostEditContainer,
  PostEditBtn,
  PostLikeContainer,
  PostLikeCount,
} from "styles/Posts/PostStyle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CustomSnackbar, setAlertData } from "components/CustomSnackbar";
import { del } from "utils/api";
import { img } from "utils/imgImport";
import { ALERT_TYPE, FAIL_MESSAGE } from "utils/constants";

function Post() {
  const params = useParams();
  const { postId } = params;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isFetching } = useGetPost(postId);
  const [showAlert, setShowAlert] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // 유저 정보
  const { userState, isLogin } = queryClient.getQueryData("userState");
  useGetProfileUser(userState._id);

  // 게시글의 좋아요 카운트 get, 카운트수정 훅
  const likeCount = useGetPostLikeCount(postId);
  const likeMutation = usePostLikeCount(postId);

  // 좋아요 추가, 취소 커스텀훅
  const postAddLike = usePostLikeAdd(postId, userState._id);
  const postDislike = usePostDislike(postId, userState._id);
  const isPostLike = userState.postLikes.includes(postId);

  if (isFetching || likeCount.isFetching) return <Loading />;

  const isPostOwner = data.userId._id === userState._id;

  const handleDeletePost = async () => {
    try {
      await del(`posts/${postId}`);
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("posts");
      navigate("/posts");
    } catch (err) {
      console.log("삭제실패", err);
    }
  };

  // Alert
  const changeFailImage = setAlertData(
    showAlert,
    setShowAlert,
    FAIL_MESSAGE.IMAGE,
    ALERT_TYPE.ERROR
  );

  const postLikeList = isPostLike ? (
    <LikeButton
      disabled={!isLogin}
      onClick={() => {
        postDislike.mutate();
        likeMutation.mutate("down");
      }}
    >
      <FavoriteIcon />
    </LikeButton>
  ) : (
    <LikeButton
      disabled={!isLogin}
      onClick={() => {
        postAddLike.mutate();
        likeMutation.mutate("up");
      }}
    >
      <FavoriteBorderIcon />
    </LikeButton>
  );

  return (
    <>
      {isEdit ? (
        <PostEditForm setIsEdit={setIsEdit} />
      ) : (
        <>
          <PostContainer>
            <PostTitle>{data.title}</PostTitle>
            {isPostOwner && (
              <PostEditContainer>
                <PostEditBtn onClick={() => setIsEdit((cur) => !cur)}>
                  수정
                </PostEditBtn>
                <PostEditBtn onClick={handleDeletePost}>삭제</PostEditBtn>
              </PostEditContainer>
            )}
            <PostHeader>
              <PostHeaderWrap>
                <Link to={`/user/${data.userId._id}`}>
                  <PostWriter>
                    <img src={img.level[data.userId.level]} alt="level" />
                    {!data.author ? "익명 문하생" : data.author}
                  </PostWriter>
                </Link>
                <PostDate>{data.createdAt?.slice(0, 10)}</PostDate>
              </PostHeaderWrap>
              <PostLikeContainer>
                {postLikeList}
                <PostLikeCount>{likeCount.data}</PostLikeCount>
              </PostLikeContainer>
            </PostHeader>
            <PostFooter>
              {data.tags?.map((tag, index) => (
                <Link to={`/posts?tag=${tag}`} key={index}>
                  <Tag>#{tag}</Tag>
                </Link>
              ))}
            </PostFooter>
            <PostBody>
              <PostBodyWrap>
                <PostImageBox>
                  {data.imageUrls?.map((image, index) => {
                    return <PostImage key={index} src={image} />;
                  })}
                </PostImageBox>
                <ReactMarkdown
                  children={data.content}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </PostBodyWrap>
            </PostBody>
          </PostContainer>
          <CustomSnackbar {...changeFailImage} />
          <Comment postId={params.postId} />
        </>
      )}
    </>
  );
}

export default Post;
