import { UserModel } from "../schemas/user";
import { PostModel } from "../schemas/post";

class Like {
  // 좋아요
  static async findByUserIdAndPostId({ userId, postId }) {
    const found = await UserModel.findOne({ _id: userId, postLikes: postId });
    return found;
  }
  
  static async deleteAllByPostId({ postId }) {
    const updated = await UserModel.updateMany({}, {$pull: { postLikes: postId }})
    return updated;
  }

  static async create({ userId, postId }) {
    const created = await UserModel.findOneAndUpdate({ _id: userId }, {$addToSet: { postLikes: postId }})
    return created;
  }

  static async delete({ userId, postId }) {
    const deleted = await UserModel.findOneAndUpdate({ _id: userId }, {$pull: { postLikes: postId }})
    return deleted;
  }


  // 해당 post들의 likeCount를 -1 해줌
  static async decreaseLikeCountByPostIds({ postIds }) {
    const decreased = await PostModel.updateMany({ _id: { $in: postIds }}, {$inc: {likeCount: -1}});
    return decreased;
  }

  // 해당 post들을 좋아요한 user들의 postLikes 기록에서 post들의 id 삭제 (사용 x)
  // static async deleteAllByPostIds({ postIds }) {
  //   const updated = await UserModel.updateMany({}, {$pull: { postLikes: { $in: postIds } }});
  //   return updated;
  // }
}

export { Like };