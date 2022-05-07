import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { commentService } from "../services/commentService";
import assert from "assert";

const commentRouter = Router();

// 댓글 생성 => POST /posts/:postId/comments
commentRouter.post('/posts/:postId/comments', loginRequired, async (req, res, next) => {
  try {
    const loginId = req.currentUserId;
    const { postId } = req.params;
    const { content, author, userId } = req.body;
    const parentId = req.body.parentId ?? null;
    assert(loginId === userId, "유저 ID가 올바르지 않습니다.");

    const createdComment = await commentService.addComment({ postId, content, author, userId, parentId });
    
    if (createdComment?.errorMessage) throw new Error(createdComment.errorMessage);

    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

// 댓글 전체 불러오기 => GET /posts/:postId/comments
commentRouter.get('/posts/:postId/comments', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { page, limit } = req.query;
    const comments = await commentService.getComments({ postId, page, limit });

    if (comments?.errorMessage) throw new Error(comments.errorMessage);
    
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

// 댓글 하나만 보기 (필요없을 것 같긴 하지만) => GET /comments/:commentId (/posts/:postId/comments/:commentId)
commentRouter.get('/comments/:commentId',  async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getComment({ commentId });
    if (comment?.errorMessage) throw new Error(comment.errorMessage);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
});

// 댓글 수정  => PUT /comments/:commentId (/posts/:postId/comments/:commentId ?)
commentRouter.put('/comments/:commentId', loginRequired, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const toUpdate = { content }
    const updatedComment = await commentService.setComment({ commentId, toUpdate });
    if (updatedComment.errorMessage) throw new Error(updatedComment.errorMessage);
    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

// 댓글 삭제 => DELETE /comments/:commentId
commentRouter.delete('/comments/:commentId', loginRequired, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await commentService.deleteComment({ commentId });
    if (deletedComment.errorMessage) throw new Error(deletedComment.errorMessage);
    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

export { commentRouter };