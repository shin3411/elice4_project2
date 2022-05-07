import { User, Post, Comment } from "../db";

class commentService {
  static async addComment({ postId, content, author, userId, parentId }) {
    const [ post, user ] = await Promise.all([Post.findById({ postId }), User.findById({ userId })]);

    if (!post) return { errorMessage: "존재하지 않는 게시글입니다. "};
    if (!user) return { errorMessage: "존재하지 않는 사용자입니다. "};

    const newComment = {
        postId,
        content,
        author,
        userId,
        parentId,
    }

    const createdComment = await Comment.create({ newComment });
    return createdComment;
  }

  static async getComments({ postId, page, limit }) {
    const post = await Post.findById({ postId });
    if (!post) return { errorMessage: "존재하지 않는 게시글입니다. " };

    const query = { postId, parentId: null, isDeleted: false };
    //page 혹은 limit의 값이 "", undefined 이런 경우 => 페이지네이션 안한다.
    if (!page || !limit) {
      const comments = await Comment.findByPostId({ query, page: 1, limit: Infinity })
      return { isLast: true, comments };
    }

    let isLast = false;
    page = Number(page);
    limit = Number(limit);
    const total = await Comment.count({ query });

    if (total === 0) return { isLast: true, comments: [] };
    
    const totalPages = Math.ceil(total / limit);
    if (totalPages === page) isLast = true;
    if (totalPages < page)
      return { errorMessage: "존재하지 않는 페이지입니다" };

    const comments = await Comment.findByPostId({ page, limit, query });
    return { isLast, comments };
  }

  static async setComment({ commentId, toUpdate }){
    const comment = await Comment.findById({ commentId });
    if(!comment) return { errorMessage: "존재하지 않는 댓글입니다."};

    if (!toUpdate['content']) return { errorMessage: "수정 내용이 없습니다."};

    const updatedComment = await Comment.update({ commentId, toUpdate });
    return updatedComment;
  }

  static async deleteComment({ commentId }){
    const comment = await Comment.findById({ commentId });
    if(!comment) return { errorMessage: "존재하지 않는 댓글입니다."};

    const deletedComment = await Comment.delete({ commentId });
    return deletedComment;
  }

  // 게시글 삭제 시에 진행할 댓글 삭제 Service
  static async deleteCommentsByPostId({ postId }){
    const deletedComment = await Comment.deleteAllByPostId({ postId });

    if(!deletedComment.acknowledged){
      return { errorMessage: "댓글이 정상적으로 삭제되지 않았습니다.(back-error)"}
    }
    return { success: true };
  }

  // 유저 탈퇴 시에 진행할 댓글 삭제 Service
  static async deleteCommentsByUserId({ userId }){
    const deletedComment = await Comment.deleteAllByUserId({ userId });

    if(!deletedComment.acknowledged){
      return { errorMessage: "댓글이 정상적으로 삭제되지 않았습니다.(back-error)"}
    }
    return { success: true };
  }
};

export { commentService };