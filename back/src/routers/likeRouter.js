import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { likeService } from "../services/likeService";
import assert from "assert";

const likeRouter = Router();

// PATCH /users/:userId/like => 좋아요 추가
// body = { postId: ~~ }
likeRouter.patch("/users/:userId/like", 
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId;
      const { userId } = req.params;
      const { postId } = req.body;

      assert(userId === loginId, "유저id가 올바르지 않습니다.");

      const newLike = await likeService.addLike({ userId, postId });

      if (newLike.errorMessage) {
        throw new Error(newLike.errorMessage);
      }
    
      res.status(201).send({message: "success"});
    } catch (error) {
      next(error);
    };
});

// PATCH /users/:userId/cancelLike => 좋아요 취소
// body = { postId: ~~ }
likeRouter.patch("/users/:userId/cancelLike", 
  loginRequired,
  async (req, res, next) => {
    try {
      const loginId = req.currentUserId;
      const { userId } = req.params;

      assert(loginId === userId, "유저 ID가 올바르지 않습니다.");

      const { postId } = req.body;
      const deletedLike = await likeService.deleteLike({ userId, postId });
      
      if (deletedLike.errorMessage) {
        throw new Error(deletedLike.errorMessage);
      }

      res.status(200).send({message: "성공적으로 삭제가 완료되었습니다."});
    } catch (error) {
      next(error);
    }
});

// GET /posts/:postId/likes => 글에 "좋아요!"를 누른 사람들 정보 반환
likeRouter.get('/posts/:postId/likes', async (req, res, next) => {
  try{
    const { postId } = req.params;

    const likedUsers = await likeService.getPostLikes({ postId });
    if (likedUsers.errorMessage){
      throw new Error(likedUsers.errorMessage);
    }
    
    res.status(200).json(likedUsers);
  } catch(err) {
    next(err);
  }
});

// GET /users/:userId/likes => 유저가 좋아요를 누른 글 반환 (페이지네이션 적용)
likeRouter.get('/users/:userId/likes', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;

    const posts = await likeService.getLikedPostsByUserId({ userId, page, limit });
    if (posts.errorMessage) {
      throw new Error(posts.errorMessage);
    }

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
})

export { likeRouter };