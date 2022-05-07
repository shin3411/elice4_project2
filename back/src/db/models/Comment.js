import { CommentModel } from '../schemas/comment';
import { findByPagination2 } from "../../utils/findByPagination";

class Comment {
  static async create({ newComment }) {
    const createdComment = await CommentModel.create(newComment);
    return createdComment;
  }

  static async count({ query }) {
    const total = await CommentModel.countDocuments(query);
    return total;
  }

  static async findByPostId({ page, limit, query }) {
    const comments = await CommentModel.find(query)
      .lean()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", { _id: 0, profileUrl: 1, nickname: 1 })
      .populate({
        path: "childComments",
        match: { isDeleted: { $eq: false } },
        select: { postId: 0 },
        populate: {
          path: "user",
          select: { _id: 0, profileUrl: 1, nickname: 1 },
        },
      });

    return comments;
  }

  static async findAllByPostId({ query }) {
    const comments = await CommentModel.find(query)
      .lean()
      .populate("userId", { _id: 1, profileUrl: 1, nickname: 1 })
      .populate({
        path: "childComments",
        select: { postId: 0 },
        populate: {
          path: "userId",
          select: { _id: 1, profileUrl: 1, nickname: 1 },
        },
      });

    return comments;
  }

  static async findById({ commentId }) {
    const comment = await CommentModel.findOne({ _id: commentId }).populate(
      "childComments"
    );
    return comment;
  }

  static async update({ commentId, toUpdate }) {
    const filter = { _id: commentId };
    const option = { returnOriginal: false };
    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    return updatedComment;
  }

  static async delete({ commentId }) {
    // soft delete 방식 사용
    const filter = { _id: commentId, isDeleted: { $eq: false } };
    const toUpdate = { isDeleted: true };
    const option = { returnOriginal: false };

    const deletedComment = await CommentModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    
    return deletedComment;
  }

  static async deleteAllByPostId({ postId }){
    // soft delete 방식 사용
    const filter = { postId, isDeleted: { $eq: false } };
    const toUpdate = { isDeleted: true };

    const deletedComments = await CommentModel.updateMany(
      filter,
      toUpdate
    );

    return deletedComments;
  }

  static async deleteAllByUserId({ userId }){
    // soft delete 방식 사용
    const filter = { userId, isDeleted: { $eq: false } };
    const toUpdate = { isDeleted: true };

    const deletedComments = await CommentModel.updateMany(
      filter,
      toUpdate
    );

    return deletedComments;
  }
}

export { Comment };